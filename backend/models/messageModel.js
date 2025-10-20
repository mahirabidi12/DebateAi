import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  debateId: { type: mongoose.Schema.Types.ObjectId, ref: "Debate", required: true },
  speaker: { type: String, enum: ["user", "bot"], required: true },
  text: { type: String, required: true },
  embedding: { type: [Number], index: "vector" }, // MongoDB vector index
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

export default Message