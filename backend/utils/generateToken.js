import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function generateToken(id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

export default generateToken;
