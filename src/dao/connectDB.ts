import mongoose from "mongoose";
import { DATABASE_URL } from '../constants/databaseUrl';

mongoose.connect(DATABASE_URL);
mongoose.connection.on('open',()=>console.log("MondoDB conected"));
mongoose.connection.on('error',(error:Error)=>console.log(error));