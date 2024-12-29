import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async()=>{
    try {
        await mongoose.connect( process.env.MONGO_URI);
        console.log("mongodb connected");
    } catch (error) {
        console.log(error);
    }
} ;

dbConnection();





