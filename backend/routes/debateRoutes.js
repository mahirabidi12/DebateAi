import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { addUserMessage, createDebate , getAiResponse, getDebateById, getDebateHistory, getDebatesForUser, getFirstAiArgument} from '../controllers/debateController.js'

const router = express.Router()

router.post("/createDebate" , protect , createDebate)
router.post("/getAllDebates" , protect , getDebatesForUser)
router.post("/getFirstAiArgument" , protect , getFirstAiArgument)

router.get("/:id", protect, getDebateById);

router.post("/addUserMessage", protect, addUserMessage);

router.post("/getAiResponse", protect, getAiResponse);

router.get("/history/:id", protect, getDebateHistory);

export default router