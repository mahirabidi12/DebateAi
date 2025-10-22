import express from "express";
import { githubCallback, googleCallback, login, logout, signup } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import passport from "passport";


const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.get("/test" ,protect,(req,res) => {
    res.send("testing done")
})
router.post("/logout", logout);


// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback);


export default router;