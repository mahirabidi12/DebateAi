import express from "express";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


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


export function logout(req, res) {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: "Logged out successfully." });
}



export const googleCallback = async (req, res) => {
    const token = await generateToken(req.user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

export const githubCallback = async (req, res) => {
    const token = await generateToken(req.user._id);
     res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};
