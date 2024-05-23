import express from "express";
import router from "./routes/index";
import { APP_PORT } from "./constants/appConstants";
import cors from "./config/cores";
import './dao/connectDB';

const app=express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors);

app.use("/", router);

app.listen(APP_PORT,()=>{
    console.log(`Server listening on http://localhost:${APP_PORT}/`);
});