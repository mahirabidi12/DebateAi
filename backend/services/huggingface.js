import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function getEmbedding(text) {
  try {
    const embedding = await hf.featureExtraction({
      model: "BAAI/bge-large-en-v1.5",
      inputs: text,
    });

    return embedding;
  } catch (err) {
    console.error("❌ Error generating embedding:", err);
    throw new Error("Failed to generate embedding");
  }
}
 