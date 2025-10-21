import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addUserMessage,
  analyzeDebate,
  createDebate,
  getAiResponse,
  getDebateById,
  getDebateHistory,
  getDebatesForUser,
  getDebateTopics,
  getFirstAiArgument,
  getOverallAnalytics,
} from "../controllers/debateController.js";

const router = express.Router();

router.post("/createDebate", protect, createDebate);
router.post("/getAllDebates", protect, getDebatesForUser);
router.post("/getFirstAiArgument", protect, getFirstAiArgument);

router.post("/addUserMessage", protect, addUserMessage);

router.post("/getAiResponse", protect, getAiResponse);

router.get("/history/:id", protect, getDebateHistory);

router.get("/getDebateTopics", protect, getDebateTopics);

router.get("/analytics", protect, getOverallAnalytics);

router.get("/:id", protect, getDebateById);

router.post("/analyze/:id", protect, analyzeDebate);

export default router;
