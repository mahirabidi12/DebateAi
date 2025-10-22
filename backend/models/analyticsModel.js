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
    // You can add more aggregated fields here later, like average scores
    argumentStrengthScores: [{ type: Number }], // New
     evidenceUsageScores: [{ type: Number }],    // New
     rebuttalEffectivenessScores: [{ type: Number }], // New
     fallacyCounts: [{ type: Number }],          // New - Store count per debate
     // Add timestamps for trend charting
     debateDates: [{ type: Date }],              // New
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
