import express from 'express'
import app from './app.js'
import dotenv from 'dotenv'
import connectDb from './config/db.js'

dotenv.config()

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

connectDb()