import express from 'express'
import app from './app.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors";
import connectDb from './config/db.js'
import authRouter from './routes/authRoutes.js'
import debateRouter from './routes/debateRoutes.js'
import session from 'express-session';
import passport from './config/passport.js';

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true, 
  })
);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',                 REMEMBER
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));



app.use(passport.initialize());
app.use(passport.session());


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use("/auth" , authRouter)
app.use("/debate" , debateRouter) 

 app.get("/health", (req, res) => {
   res.status(200).json({ status: "OK", message: "Server is healthy" });
 });

connectDb() 