import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { addUserMessage, createDebate , getAiResponse, getDebateById, getDebatesForUser, getFirstAiArgument} from '../controllers/debateController.js'


const router = express.Router()

router.post("/createDebate" , protect , createDebate)
router.post("/getAllDebates" , protect , getDebatesForUser)
router.post("/getFirstAiArgument" , protect , getFirstAiArgument)

router.get("/:id", protect, getDebateById);

router.post("/addUserMessage", protect, addUserMessage);

router.post("/getAiResponse", protect, getAiResponse);


export default router