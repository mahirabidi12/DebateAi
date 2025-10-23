# 🤖💬 DebateAi — Advanced RAG-Powered AI Debating Platform

**DebateAi** is an interactive, full-stack web platform that enables users to **practice, analyze, and improve their debating skills** against an AI opponent.  
Built using **Retrieval-Augmented Generation (RAG)**, **vector embeddings**, and **large language models (LLMs)**, DebateAi delivers contextually aware, dynamic, and voice-enabled debates — all within your browser.

---

## 🧠 Core Concept

DebateAi combines **AI reasoning**, **speech technologies**, and **vector search** to simulate realistic debates.  
Each AI response is enriched using **RAG**, ensuring it references the user’s past arguments for improved **relevance**, **context-awareness**, and **coherence**.

---

## ⚙️ Key Technologies & Services

### 🧩 **AI & Machine Learning**

| Component | Technology Used | Description |
|------------|----------------|-------------|
| **Text-to-Speech (TTS)** | [AWS Polly](https://aws.amazon.com/polly/) | Converts AI responses into natural-sounding speech. |
| **Embeddings Model** | [NVIDIA Embedding API](https://build.nvidia.com/nvidia/llama-3_2-nemoretriever-300m-embed-v2) — `nvidia/llama-3.2-nemoretriever-300m-embed-v2` | Converts debate text into dense vector embeddings for semantic retrieval. |
| **Vector Database** | [MongoDB Atlas Vector Search](https://www.mongodb.com/products/platform/atlas-vector-search) | Stores and retrieves relevant past debate segments for RAG. |
| **Speech-to-Text (STT)** | [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Captures user arguments through real-time voice input. |
| **Alternative Embedding Options (Explored)** | [Hugging Face Transformers](https://huggingface.co/) | Evaluated for potential embedding and generation capabilities. |
| **Core LLM** | [Google Gemini API](https://ai.google.dev/) — `gemini-2.5-flash` | Generates AI arguments, debate analyses, and topic suggestions. |

---

## 🧱 Full-Stack Architecture

### 🖥️ **Frontend**
- **React.js** with **Vite** for high-performance builds.
- **Tailwind CSS** for modern, responsive UI.
- **React Router** for smooth navigation.
- **Recharts** for post-debate data visualization.
- **Web Speech API** for speech input integration.

**Deployed on:** [Vercel](https://vercel.com/)

---

### ⚙️ **Backend**
- **Node.js** + **Express.js** server.
- **Mongoose ODM** for MongoDB.
- **Passport.js** for OAuth (Google & GitHub authentication).
- **JWT + Cookies + Sessions** for secure user handling.
- **RAG Pipeline** using NVIDIA embeddings + MongoDB vector search.
- **Gemini API** for LLM responses & debate analysis.
- **AWS Polly** for TTS integration.
- **Cron Job** (Render) to maintain backend uptime.

**Deployed on:** [Render](https://render.com/)

---

## 🗣️ Core Features

| Feature | Description |
|----------|-------------|
| 🎙️ **AI Debates** | Engage in live, RAG-powered debates against an AI opponent. |
| 🧠 **RAG Context Memory** | AI references your past arguments for better logical flow. |
| 📊 **Performance Analytics** | Post-debate breakdown of argument quality, tone, and persuasion. |
| 🕒 **Timed Debates** | Option to limit time for responses — simulating real competition. |
| 🔐 **Authentication** | Login via credentials or OAuth (Google/GitHub). |
| 💾 **Debate History** | Access all previous debates and analyses in your dashboard. |
| 🔊 **Text-to-Speech (TTS)** | Listen to AI arguments in realistic speech using AWS Polly. |
| 🎤 **Speech-to-Text (STT)** | Speak your arguments — automatically transcribed using Web Speech API. |

---

## 🛠️ Project Setup (Local Development)

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd DebateAi-main