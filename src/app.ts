import express from "express";
import router from "./routes/index";
import dotenv from 'dotenv'
import cors from "./config/cores";
import './dao/connectDB';

const app=express();
dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors);

app.use("/", router);

app.listen(process.env.APP_PORT,()=>{
    console.log(`Server listening on http://localhost:${process.env.APP_PORT}/`);
});