import express from "express";
import mongoose from "mongoose";
import Debate from "../models/debateModel.js";
import Message from "../models/messageModel.js";
import { generateDebateAiOpeningPrompt, generateDebateAiResponsePrompt, generateDebateTopicsPrompt } from "../services/prompts.js";
import { getGeminiResponse } from "../services/gemini.js";
import { getEmbedding } from "../services/huggingface.js";


export async function createDebate(req, res) {
  try {
    // console.log("first")
    const { title, topic, stance, duration } = req.body;
    const userId = req.user._id;
    // console.log(userId)
    // console.log(typeof userId)
    const debate = await Debate.create({
      title,
      topic,
      stance,
      duration,
      user: userId,
    });
    // console.log(debate)

    res.status(200).json(debate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getDebatesForUser(req, res) {
  try {
    const debates = await Debate.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(debates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function getDebateById(req, res) {
    try {
        // console.log(req.params.id)
        const debate = await Debate.findById(req.params.id);
        if (!debate) {
            return res.status(404).json({ message: 'Debate not found' });
        }
        // Ensure the debate belongs to the user requesting it
        if (debate.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized' });
        }
        res.status(200).json(debate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export async function getFirstAiArgument(req, res) {
    try {
        const { topic, stance, debateId } = req.body;
        
        if (!topic || !stance || !debateId) {
            return res.status(400).json({ message: "Topic, stance, and debateId are required." });
        }
        
        const debate = await Debate.findById(debateId);
        if (!debate) {
            return res.status(404).json({ message: "Debate not found." });
        }

        const prompt = generateDebateAiOpeningPrompt(topic,stance)
        
        const aiArgument = await getGeminiResponse(prompt);
        
        // Generate embedding for the AI's argument
        const embedding = await getEmbedding(aiArgument);

        // Save the AI's first message to the database
        await Message.create({
            debateId: debateId,
            role: 'ai',
            text: aiArgument,
            embedding: embedding,
        });

        // Increment the AI statement count in the debate document
        debate.aiStatementCount += 1;
        await debate.save();
        
        res.status(200).json({ argument: aiArgument });
    } catch (error) {
        // console.error("Error generating first AI argument:", error);
        // res.status(500).json({ message: "Failed to generate AI argument." });
        if (error.message === 'GEMINI_MODEL_OVERLOADED') {
            return res.status(503).json({ message: "The AI model is currently overloaded. Please try again in a moment." });
        }
        console.error("Error generating first AI argument:", error);
        res.status(500).json({ message: "Failed to generate AI argument." });
    }
}


export async function addUserMessage(req, res) {
    try {
        const { debateId, message } = req.body;
        if (!debateId || !message) {
            return res.status(400).json({ message: "Debate ID and message are required." });
        }

        const debate = await Debate.findById(debateId);
        if (!debate) {
            return res.status(404).json({ message: "Debate not found." });
        }
        if (debate.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "User not authorized." });
        }

        const embedding = await getEmbedding(message);

        await Message.create({
            debateId: debateId,
            role: 'user',
            text: message,
            embedding: embedding
        });
        
        debate.userStatementCount += 1;
        await debate.save();

        res.status(201).json({ message: "Message saved successfully." });
    } catch (error) {
        console.error("Error adding user message:", error);
        res.status(500).json({ message: "Failed to save user message." });
    }
}


export async function getAiResponse(req, res) {
        try {
        const { debateId, userLastArgument } = req.body;

        if (!debateId || !userLastArgument) {
            return res.status(400).json({ message: "Debate ID and user's last argument are required." });
        }
        
        const debate = await Debate.findById(debateId);
        if (!debate) {
            return res.status(404).json({ message: "Debate not found." });
        }

        const lastAiMessage = await Message.findOne({ debateId, role: 'ai' }).sort({ createdAt: -1 });
        if (!lastAiMessage) {
            return res.status(404).json({ message: "Could not find previous AI argument." });
        }

        // --- RAG Implementation Starts Here ---
        
        // Get embedding for the user's current argument to use in the search
        const queryEmbedding = await getEmbedding(userLastArgument);

        // Always perform the vector search. The JS filter below will handle the results.
        const similarDocs = await Message.aggregate([
            {
                $vectorSearch: {
                    index: 'vector_index_2', // This MUST match the name of the index you created in Atlas
                    path: 'embedding',
                    queryVector: queryEmbedding,
                    numCandidates: 15,
                    limit: 4, // Fetch 4 to have a better chance of getting 3 *other* arguments
                    filter: {
                        debateId: new mongoose.Types.ObjectId(debateId),
                        role: 'user'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    text: 1,
                    score: { $meta: 'vectorSearchScore' }
                }
            }
        ]);

        // Filter out the *exact* same message from the results and take the top 3
        const relatedUserArguments = similarDocs
            .filter(doc => doc.text !== userLastArgument)
            .slice(0, 3) // Ensure we only take up to 3 related arguments
            .map(doc => doc.text);
        
        // --- RAG Implementation Ends Here ---

        console.log("Found related user arguments:", relatedUserArguments);
        
        const aiStance = debate.stance === 'for' ? 'against' : 'for';
        
        const prompt = generateDebateAiResponsePrompt({
            topic: debate.topic,
            aiStance,
            userLastArgument,
            aiLastArgument: lastAiMessage.text,
            relatedUserArguments 
        });

        const aiResponse = await getGeminiResponse(prompt);
        const embedding = await getEmbedding(aiResponse);

        await Message.create({
            debateId,
            role: 'ai',
            text: aiResponse,
            embedding
        });

        debate.aiStatementCount += 1;
        await debate.save();

        res.status(200).json({ response: aiResponse });

    } catch (error) {
        // console.error("Error generating AI response:", error);
        // res.status(500).json({ message: "Failed to generate AI response." });
        if (error.message === 'GEMINI_MODEL_OVERLOADED') {
            return res.status(503).json({ message: "The AI model is currently overloaded. Please try again in a moment." });
        }
        console.error("Error generating AI response:", error);
        res.status(500).json({ message: "Failed to generate AI response." });
    }
}

export async function getDebateHistory(req, res) {
    try {
        const { id } = req.params;
        const messages = await Message.find({ debateId: id }).sort({ createdAt: 'asc' });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch debate history." });
    }
}

export async function getDebateTopics(req,res) {
    try {
        const prompt = generateDebateTopicsPrompt()
        let response = await getGeminiResponse(prompt)

        const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
            response = jsonMatch[1];
        }

        // Further cleanup for any remaining non-JSON characters
        response = response.trim();
        if (response.startsWith('`')) {
            response = response.replace(/`/g, '');
        }
        

        const result = JSON.parse(response)
        console.log(result)
        res.status(200).json({result})
    } catch (error) { 
        console.log(error)
        if (error.message === 'GEMINI_MODEL_OVERLOADED') {
            return res.status(503).json({ message: "The AI model is currently overloaded. Please try again in a moment." });
        }
        res.status(500).json({"message" : "Failed to fetch best topics "}) 
    }
}  