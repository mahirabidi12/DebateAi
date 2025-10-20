import express from 'express'
import app from './app.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import authRouter from './routes/authRoutes.js'
import cors from "cors";

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your frontend URL
    credentials: true, // if using cookies or authorization headers
  })
);

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use("/auth" , authRouter)

connectDb()