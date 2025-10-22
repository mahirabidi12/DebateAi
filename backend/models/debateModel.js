import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
    clarityScore: Number,
    concisenessScore: Number,
    relevanceScore: Number,
    argumentStrengthScore: Number,    
     evidenceUsageScore: Number,       
     rebuttalEffectivenessScore: Number, 
     fallacyCount: Number,             
    strengths: [String],
    areasForImprovement: [String],
    logicalFallacies: [{
        fallacy: String,
        quote: String,
        explanation: String
    }],
    summary: String
}, { _id: false });


const debateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  stance: { type: String, enum: ["for", "against"], required: true },
  duration: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  userStatementCount: { type: Number, default: 0 },
  aiStatementCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  analytics: analysisSchema
});

const Debate = mongoose.model("Debate", debateSchema);

export default Debate
