import mongoose from "mongoose";

export const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to DB successfully`)
        
    } catch(e) {
        console.log(`Error connecting to DB: ${e.message}`)
    }
}