import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    totalDebates: { type: Number, default: 0 },
    clarityScores: [{ type: Number }],
    concisenessScores: [{ type: Number }],
    relevanceScores: [{ type: Number }],
    argumentStrengthScores: [{ type: Number }], 
     evidenceUsageScores: [{ type: Number }],    
     rebuttalEffectivenessScores: [{ type: Number }], 
     fallacyCounts: [{ type: Number }],          
     debateDates: [{ type: Date }],              
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
