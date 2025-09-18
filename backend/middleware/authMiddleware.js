import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

dotenv.config();

async function protect(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "No token, not authorized" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
}

export default protect