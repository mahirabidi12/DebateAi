import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { createDebate , getDebateById, getDebatesForUser, getFirstAiArgument} from '../controllers/debateController.js'


const router = express.Router()

router.post("/createDebate" , protect , createDebate)
router.post("/getAllDebates" , protect , getDebatesForUser)
router.post("/getFirstAiArgument" , protect , getFirstAiArgument)

router.get("/:id", protect, getDebateById);


export default router