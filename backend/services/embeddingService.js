import dotenv from "dotenv";
dotenv.config();

/**
 * Generates embeddings from text using the NVIDIA API.
 * @param {string | string[]} text The text or array of texts to embed.
 * @param {'query' | 'passage'} inputType The type of input for embedding ('query' for search, 'passage' for documents).
 * @returns {Promise<number[] | number[][]>} A promise that resolves to the embedding vector(s).
 */
export async function getEmbedding(text, inputType = 'passage') {
  const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
  const API_URL = process.env.NVIDIA_API_URL;

  if (!NVIDIA_API_KEY || !API_URL) {
    throw new Error("NVIDIA API credentials must be set in the .env file.");
  }


  const texts = Array.isArray(text) ? text : [text];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: texts,
        model: "nvidia/llama-3.2-nemoretriever-300m-embed-v2",
        input_type: inputType,
      }),
    });

    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`NVIDIA API Error: ${errorBody.detail || response.statusText}`);
    }

    const result = await response.json();
    const embeddings = result.data.map((item) => item.embedding);


    return Array.isArray(text) ? embeddings : embeddings[0];

  } catch (error) {
    console.error(`Error in getEmbedding function: ${error.message}`);
    throw new Error("Failed to get embeddings from NVIDIA.");
  }
}

