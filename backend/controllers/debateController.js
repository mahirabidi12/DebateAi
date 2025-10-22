import express from "express";
import mongoose from "mongoose";
import Debate from "../models/debateModel.js";
import Message from "../models/messageModel.js";
import { generateDebateAiOpeningPrompt, generateDebateAiResponsePrompt, generateDebateAnalysisPrompt, generateDebateTopicsPrompt } from "../services/prompts.js";
import { getGeminiResponse } from "../services/gemini.js";
// import { getEmbedding } from "../services/huggingface.js";
import { generateSpeech } from "../services/polly.js";
import { getEmbedding } from "../services/embeddingService.js";
import Analytics from "../models/analyticsModel.js";


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
        // const embedding = await getEmbedding(aiArgument);

         const [embedding, audioData] = await Promise.all([
            getEmbedding(aiArgument),
            generateSpeech(aiArgument)
        ]);

        console.log(embedding)

        await Message.create({
            debateId: debateId,
            role: 'ai',
            text: aiArgument,
            embedding: embedding,
        });


        debate.aiStatementCount += 1;
        await debate.save();
        
        res.status(200).json({ argument: aiArgument ,  audio: audioData });
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


        

        const queryEmbedding = await getEmbedding(userLastArgument);


        const similarDocs = await Message.aggregate([
            {
                $vectorSearch: {
                    index: 'vector_index_2',
                    path: 'embedding',
                    queryVector: queryEmbedding,
                    numCandidates: 15,
                    limit: 4, 
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


        const relatedUserArguments = similarDocs
            .filter(doc => doc.text !== userLastArgument)
            .slice(0, 3) 
            .map(doc => doc.text);
        


        console.log("Found related user arguments:", relatedUserArguments);
        
        const aiStance = debate.stance === 'for' ? 'against' : 'for';
        
        const prompt = generateDebateAiResponsePrompt({
            topic: debate.topic,
            aiStance,
            userLastArgument,
            aiLastArgument: lastAiMessage.text,
            relatedUserArguments 
        });

        const aiResponseText = await getGeminiResponse(prompt);
        // const embedding = await getEmbedding(aiResponse);
        const [embedding, audioData] = await Promise.all([
            getEmbedding(aiResponseText),
            generateSpeech(aiResponseText)
        ]);

        await Message.create({
            debateId,
            role: 'ai',
            text: aiResponseText,
            embedding
        });

        debate.aiStatementCount += 1;
        await debate.save();

        res.status(200).json({ response: aiResponseText , audio: audioData  });

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


        response = response.trim();
        if (response.startsWith('`')) {
            response = response.replace(/`/g, '');
        }
        

        const result = JSON.parse(response)
        // console.log(result)
        res.status(200).json({result}) 
    } catch (error) { 
        console.log(error)
        if (error.message === 'GEMINI_MODEL_OVERLOADED') {
            return res.status(503).json({ message: "The AI model is currently overloaded. Please try again in a moment." });
        }
        res.status(500).json({"message" : "Failed to fetch best topics "}) 
    }
}  




// --- NEW ANALYTICS FUNCTION ---

// export async function analyzeDebate(req, res) {
//     try {
//         const { id: debateId } = req.params;
//         const debate = await Debate.findById(debateId);

//         if (!debate) {
//             return res.status(404).json({ message: "Debate not found." });
//         }
//         if (debate.user.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: "User not authorized." });
//         }

//         // Prevent re-analyzing
//         if (debate.analytics) {
//             return res.status(200).json(debate.analytics);
//         }

//         const messages = await Message.find({ debateId }).sort({ createdAt: 'asc' });
//         const transcript = messages.map(m => `${m.role === 'ai' ? 'AI' : 'User'}: ${m.text}`).join('\n\n');
        
//         console.log(transcript)
//         const prompt = generateDebateAnalysisPrompt(transcript);
//         const analysisResponse = await getGeminiResponse(prompt);
//         console.log(analysisResponse)

//         let analysisJson;
//         try {
//             const cleanedResponse = analysisResponse.replace(/```json\s*|\s*```/g, '').trim();
//             analysisJson = JSON.parse(cleanedResponse);
//         } catch (parseError) {
//             console.error("Failed to parse analysis JSON:", parseError);
//             throw new Error("AI returned an invalid analysis format.");
//         }

//         debate.analytics = analysisJson;
//         await debate.save();

//         // Update or create central analytics for the user
//         let userAnalytics = await Analytics.findOne({ user: req.user._id });
//         if (!userAnalytics) {
//             userAnalytics = await Analytics.create({
//                 user: req.user._id,
//                 totalDebates: 0,
//                 clarityScores: [],
//                 concisenessScores: [],
//                 relevanceScores: [],
//             });
//         }

//         userAnalytics.totalDebates += 1;
//         userAnalytics.clarityScores.push(analysisJson.clarityScore);
//         userAnalytics.concisenessScores.push(analysisJson.concisenessScore);
//         userAnalytics.relevanceScores.push(analysisJson.relevanceScore);
        
//         await userAnalytics.save();


//         res.status(200).json(analysisJson);

//     } catch (error) {
//         console.error("Error analyzing debate:", error);
//         if (error.message === 'GEMINI_MODEL_OVERLOADED') {
//             return res.status(503).json({ message: "The AI model is currently overloaded. Please try again later." });
//         }
//         res.status(500).json({ message: "Failed to analyze debate." });
//     }
// }




// export async function getOverallAnalytics(req, res) {
//     try {
//         let analytics = await Analytics.findOne({ user: req.user._id });
//         if (!analytics) {
//             // If no analytics doc exists, create a default one
//             analytics = {
//                 totalDebates: 0,
//                 clarityScores: [],
//                 concisenessScores: [],
//                 relevanceScores: [],
//             };
//         }
//         res.status(200).json(analytics);
//     } catch (error) {
//         console.error("Error fetching overall analytics:", error);
//         res.status(500).json({ message: "Failed to fetch analytics." });
//     }
// }



export async function analyzeDebate(req, res) {
     try {
         const { id: debateId } = req.params;
         const debate = await Debate.findById(debateId);

         if (!debate) {
             return res.status(404).json({ message: "Debate not found." });
         }
         if (debate.user.toString() !== req.user._id.toString()) {
             return res.status(403).json({ message: "User not authorized." });
         }


         if (debate.analytics && debate.analytics.summary) { 
             console.log(`Analysis already exists for debate ${debateId}`);
             return res.status(200).json(debate.analytics);
         }

         const messages = await Message.find({ debateId }).sort({ createdAt: 'asc' });

         if (messages.length === 0) {
              console.log(`No messages found for debate ${debateId}, cannot analyze.`);

              debate.analytics = { summary: "No arguments were made in this debate.", fallacyCount: 0 };
              await debate.save();
              return res.status(200).json(debate.analytics);
         }

         const transcript = messages.map(m => `${m.role === 'ai' ? 'AI' : 'User'}: ${m.text}`).join('\n\n');

         console.log(`Transcript for analysis (Debate ${debateId}):\n${transcript.substring(0, 300)}...`); 

         const prompt = generateDebateAnalysisPrompt(transcript);
         const analysisResponse = await getGeminiResponse(prompt);
         console.log(`Raw analysis response for debate ${debateId}:\n${analysisResponse}`); 

         let analysisJson;
         try {

             const cleanedResponse = analysisResponse.replace(/^```json\s*|\s*```$/g, '').trim();
             analysisJson = JSON.parse(cleanedResponse);

             // Basic validation
             if (typeof analysisJson.clarityScore !== 'number' ||
                 typeof analysisJson.concisenessScore !== 'number' ||
                 typeof analysisJson.relevanceScore !== 'number' ||
                 typeof analysisJson.argumentStrengthScore !== 'number' ||
                 typeof analysisJson.evidenceUsageScore !== 'number' ||
                 typeof analysisJson.rebuttalEffectivenessScore !== 'number' ||
                 typeof analysisJson.fallacyCount !== 'number' ||
                 !Array.isArray(analysisJson.strengths) ||
                 !Array.isArray(analysisJson.areasForImprovement) ||
                 !Array.isArray(analysisJson.logicalFallacies) ||
                 typeof analysisJson.summary !== 'string') {
                 throw new Error("Parsed JSON structure is invalid.");
             }

         } catch (parseError) {
             console.error(`Failed to parse analysis JSON for debate ${debateId}:`, parseError, "Raw response:", analysisResponse);

             analysisJson = {
                 clarityScore: 0, concisenessScore: 0, relevanceScore: 0,
                 argumentStrengthScore: 0, evidenceUsageScore: 0, rebuttalEffectivenessScore: 0,
                 strengths: [], areasForImprovement: [], logicalFallacies: [], fallacyCount: 0,
                 summary: "Error: Could not automatically analyze this debate due to an unexpected format from the AI analyzer."
             };

             debate.analytics = analysisJson;
             await debate.save();

             return res.status(500).json({ message: "Failed to parse analysis from AI.", analysis: analysisJson });
         }


         debate.analytics = analysisJson;
         await debate.save();
         console.log(`Successfully saved analysis for debate ${debateId}`);



         let userAnalytics = await Analytics.findOne({ user: req.user._id });
         if (!userAnalytics) {
             userAnalytics = await Analytics.create({
                 user: req.user._id,
                 totalDebates: 0,
                 clarityScores: [], concisenessScores: [], relevanceScores: [],
                 argumentStrengthScores: [], evidenceUsageScores: [], rebuttalEffectivenessScores: [],
                 fallacyCounts: [], debateDates: []
             });
             console.log(`Created new central analytics for user ${req.user._id}`);
         }



         const debateDateExists = userAnalytics.debateDates.some(
              date => date.getTime() === debate.createdAt.getTime()
         );

         if (!debateDateExists) {
             userAnalytics.totalDebates += 1;
             userAnalytics.clarityScores.push(analysisJson.clarityScore);
             userAnalytics.concisenessScores.push(analysisJson.concisenessScore);
             userAnalytics.relevanceScores.push(analysisJson.relevanceScore);
             userAnalytics.argumentStrengthScores.push(analysisJson.argumentStrengthScore);
             userAnalytics.evidenceUsageScores.push(analysisJson.evidenceUsageScore);
             userAnalytics.rebuttalEffectivenessScores.push(analysisJson.rebuttalEffectivenessScore);
             userAnalytics.fallacyCounts.push(analysisJson.fallacyCount);
             userAnalytics.debateDates.push(debate.createdAt); 

             await userAnalytics.save();
             console.log(`Updated central analytics for user ${req.user._id} with debate ${debateId}`);
         } else {
              console.log(`Debate ${debateId} analysis already included in central analytics for user ${req.user._id}. Skipping update.`);
         }


         res.status(200).json(analysisJson);

     } catch (error) {
         console.error(`Error in analyzeDebate for debate ${req.params.id}:`, error);
         if (error.message === 'GEMINI_MODEL_OVERLOADED') {
             return res.status(503).json({ message: "The AI model is currently overloaded. Analysis may take longer or fail. Please try again later." });
         }
         res.status(500).json({ message: `Failed to analyze debate: ${error.message}` });
     }
 }















export async function getOverallAnalytics(req, res) {
     try {
         let analytics = await Analytics.findOne({ user: req.user._id });
         if (!analytics) {
             // If no analytics doc exists, return a default structure
             analytics = {
                 totalDebates: 0,
                 clarityScores: [], concisenessScores: [], relevanceScores: [],
                 argumentStrengthScores: [], evidenceUsageScores: [], rebuttalEffectivenessScores: [],
                 fallacyCounts: [], debateDates: []
             };
         }
         res.status(200).json(analytics);
     } catch (error) {
         console.error("Error fetching overall analytics:", error);
         res.status(500).json({ message: "Failed to fetch analytics." });
     }
 }
