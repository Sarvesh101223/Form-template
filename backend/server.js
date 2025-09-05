import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config({path: './config/config.env'})

import { connectToDB } from "./config/db.js";


const PORT = process.env.PORT || 4000

const startServer = async () => {
    try{
        await connectToDB();
        
        app.listen(PORT, () => {
            console.log(`Server running on localhost:${PORT}`)
        })

    } catch(e) {
        console.log(`Error connecting to the server: ${e.message}`)
    }
}

startServer()