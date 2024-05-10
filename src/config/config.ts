import express,{Express} from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "../routes/index";
import bodyParser from 'body-parser';
import { DATABASE_URL } from "../constants/databaseUrl";
import { APP_PORT } from "../constants/appConstants";

class App{
    public app: Express;
    public port: number;
    public db: typeof mongoose;
    private dbUrl: string;

    private initializeMiddlewares(): void {
        this.app.use(cors({credentials:true}));
        this.app.use(bodyParser.json());
      }
    
      private initializeRoutes(): void {
        this.app.use("/", router);
      }

    constructor(){
        this.app=express();
        this.port=APP_PORT;
        this.db=mongoose;
        this.dbUrl=DATABASE_URL;

        this.initializeRoutes();
        this.initializeMiddlewares();
    }

    public async listen():Promise<void>{
        await this.db.connect(this.dbUrl);
        this.db.connection.on('open',()=>console.log("MondoDB conected"));
        this.db.connection.on('error',(error:Error)=>console.log("Error Connecting Database",error));
        this.app.listen(this.port,()=>{
            console.log(`Server listening on http://localhost:${this.port}/`);
        });
    }
}

export default App;