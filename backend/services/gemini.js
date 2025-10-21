import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({});

export async function getGeminiResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text
  } catch (error) {
    // console.log(error)
    // throw new Error("Failed to generate content from Gemini");
    if (error.status === 503) {
      console.error("Gemini API Error: Model is overloaded.");
      // Throw a specific error that the controller can catch
      throw new Error("GEMINI_MODEL_OVERLOADED");
    }
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to generate content from Gemini");
  }
}