import mongoose from 'mongoose'
import { config } from './config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI)
    console.log("Connected to Database")
  } catch (error) {
    console.log("Error in connecting to Database")
  }
}