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
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
