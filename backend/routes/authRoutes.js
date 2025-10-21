import express from "express";
import { login, logout, signup } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.get("/test" ,protect,(req,res) => {
    res.send("testing done")
})
router.post("/logout", logout);

export default router;
