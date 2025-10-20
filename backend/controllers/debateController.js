import express from 'express'
import Debate from "../models/debateModel.js";
import Message from "../models/messageModel.js";

export async function createDebate(req,res) {
    try {
        const {title,topic,stance,duration} = req.body
        const userId = req.user.id
        const debate = await Debate.create({ title, topic, stance, duration, user: userId });

        res.status(201).json(debate)
    } catch (error) {
        res.status(500).json({"message" : error.message})
    }
}


export async function getDebatesForUser(req,res) {
    try {
        const debates = await Debate.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(debates)
    } catch (error) {
        res.status(500).json({"message" : error.message})
    }
}

