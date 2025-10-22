import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import dotenv from 'dotenv';

dotenv.config();


const pollyClient = new PollyClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Converts a stream to a Buffer.
 * @param {ReadableStream} stream The stream to convert.
 * @returns {Promise<Buffer>} A promise that resolves to a Buffer.
 */
const streamToBuffer = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });

/**
 * Generates speech from text using AWS Polly.
 * @param {string} text The text to synthesize.
 * @returns {Promise<string>} A promise that resolves to the base64 encoded audio data.
 */
export async function generateSpeech(text) {
  const command = new SynthesizeSpeechCommand({
    Engine: "neural", 
    OutputFormat: "mp3",
    Text: text,
    VoiceId: "Matthew",
  });

  try {
    const response = await pollyClient.send(command);
    const audioBuffer = await streamToBuffer(response.AudioStream);
    return audioBuffer.toString("base64");
  } catch (error) {
    console.error("Error synthesizing speech with AWS Polly:", error);
    throw new Error("Failed to generate speech.");
  }
}
