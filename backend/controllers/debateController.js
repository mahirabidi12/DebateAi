import express from "express";
import Debate from "../models/debateModel.js";
import Message from "../models/messageModel.js";
import { generateDebateAiOpeningPrompt } from "../services/prompts.js";
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
        console.log(req.params.id)
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
        console.error("Error generating first AI argument:", error);
        res.status(500).json({ message: "Failed to generate AI argument." });
    }
}


