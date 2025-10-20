import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { createDebate , getDebatesForUser} from '../controllers/debateController.js'

const router = express.Router()

router.post("/createDebate" , protect , createDebate)
router.post("/getAllDebates" , protect , getDebatesForUser)




export default router