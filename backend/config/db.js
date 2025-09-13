import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To MongoDb Cluster`)
    } catch (error) {
         console.error(`Failed To Connect To MongoDb Cluster` ,error);
    }
}

export default connectDb