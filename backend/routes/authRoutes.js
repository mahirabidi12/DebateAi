import express from "express";
import { login, signup } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.get("/test" ,protect,(req,res) => {
    res.send("testing done")
})

export default router;
