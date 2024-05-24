import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('open',()=>console.log("MondoDB conected"));
mongoose.connection.on('error',(error:Error)=>console.log(error));