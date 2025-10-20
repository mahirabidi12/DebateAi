import User from "../models/userModel.js";
import express from "express";
import generateToken from "../utils/generateToken.js";


import Message from "../models/messageModel.js";
import Debate from "../models/debateModel.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    const newUser = await User.create({ name, email, password });
    // console.log(newUser)
    const token = await generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errMessage: error });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (await existingUser.matchPassword(password)) {
      const token = await generateToken(existingUser._id);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    return res.status(200).json("Login Successful")
  } catch (error) {
    res.status(401).json("InvalidCredentials , Login failed")
  }
}
