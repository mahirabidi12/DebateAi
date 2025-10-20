import mongoose from "mongoose";

const debateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Debate = mongoose.model("Debate", debateSchema);

export default Debate
