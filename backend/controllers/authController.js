import express from "express";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


export async function signup(req, res) {
  try {
    console.log('[SIGNUP] Request received');
    const { name, email, password } = req.body;
    console.log('[SIGNUP] Request data:', { name, email, password: password ? '***' : 'missing' });

    console.log('[SIGNUP] Checking for existing user with email:', email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('[SIGNUP] User already exists:', email);
      return res.status(409).json({ message: "User already exist" });
    }

    console.log('[SIGNUP] Creating new user...');
    const newUser = await User.create({ name, email, password });
    console.log('[SIGNUP] User created successfully:', { id: newUser._id, email: newUser.email });
    
    console.log('[SIGNUP] Generating token...');
    const token = await generateToken(newUser._id);
    console.log('[SIGNUP] Token generated:', token ? 'Token exists' : 'Token missing');
    
    console.log('[SIGNUP] Setting cookie with options:', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,     
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    console.log('[SIGNUP] Cookie set successfully');

    console.log('[SIGNUP] Sending success response');
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error('[SIGNUP] Error occurred:', error);
    console.error('[SIGNUP] Error stack:', error.stack);
    return res.status(500).json({ errMessage: error });
  }
}

export async function login(req, res) {
  try {
    console.log('[LOGIN] Request received');
    const { email, password } = req.body;
    console.log('[LOGIN] Request data:', { email, password: password ? '***' : 'missing' });

    console.log('[LOGIN] Looking up user with email:', email);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log('[LOGIN] User not found:', email);
      return res.status(404).json({ msg: "User not found" });
    }
    console.log('[LOGIN] User found:', { id: existingUser._id, email: existingUser.email });

    console.log('[LOGIN] Verifying password...');
    const isPasswordValid = await existingUser.matchPassword(password);
    if (isPasswordValid) {
      console.log('[LOGIN] Password is valid');
      console.log('[LOGIN] Generating token...');
      const token = await generateToken(existingUser._id);
      console.log('[LOGIN] Token generated:', token ? 'Token exists' : 'Token missing');

      console.log('[LOGIN] Setting cookie with options:', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'None',
        secure:true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      });
      console.log('[LOGIN] Cookie set successfully');
      console.log('[LOGIN] Sending success response');
      return res.status(200).json("Login Successful")
    }
    console.log('[LOGIN] Invalid password for user:', email);
    return res.status(401).json({ msg: "Invalid password" })
  } catch (error) {
    console.error('[LOGIN] Error occurred:', error);
    console.error('[LOGIN] Error stack:', error.stack);
    res.status(401).json("InvalidCredentials , Login failed")
  }
}


export function logout(req, res) {
    console.log('[LOGOUT] Request received');
    console.log('[LOGOUT] Clearing cookie...');
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        // secure: process.env.NODE_ENV === 'production',
        secure:true,
        sameSite: 'None',
    });
    console.log('[LOGOUT] Cookie cleared, sending success response');
    res.status(200).json({ message: "Logged out successfully." });
}



export const googleCallback = async (req, res) => {
    console.log('[GOOGLE OAUTH] Callback received');
    console.log('[GOOGLE OAUTH] User:', { id: req.user._id, email: req.user.email });
    console.log('[GOOGLE OAUTH] Generating token...');
    const token = await generateToken(req.user._id);
    console.log('[GOOGLE OAUTH] Token generated:', token ? 'Token exists' : 'Token missing');
    console.log('[GOOGLE OAUTH] Setting cookie...');
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'None', 
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true 
    });
    console.log('[GOOGLE OAUTH] Cookie set, redirecting to:', `${process.env.FRONTEND_URL}/dashboard`);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

export const githubCallback = async (req, res) => {
    console.log('[GITHUB OAUTH] Callback received');
    console.log('[GITHUB OAUTH] User:', { id: req.user._id, email: req.user.email });
    console.log('[GITHUB OAUTH] Generating token...');
    const token = await generateToken(req.user._id);
    console.log('[GITHUB OAUTH] Token generated:', token ? 'Token exists' : 'Token missing');
    console.log('[GITHUB OAUTH] Setting cookie...');
     res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'None', 
      secure: true ,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    console.log('[GITHUB OAUTH] Cookie set, redirecting to:', `${process.env.FRONTEND_URL}/dashboard`);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};
