import express,{Express} from "express";
import { CorsOptions } from "cors";
import router from "../routes/index";
import bodyParser from 'body-parser';
import { APP_PORT } from "../constants/appConstants";
import cors from "./cores";

class App{

    public app: Express;
    public port: number;

    

    private initializeMiddlewares(): void {
      
      
       
      }
    
      private initializeRoutes(): void {
        this.app.use("/", router);
      }

    constructor(){
        this.app=express();
        this.port=APP_PORT;
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json());
        console.log("--------------------------------------------------");
        
        this.app.use(cors);

        this.initializeMiddlewares();
        this.initializeRoutes();
        

        // const corsOptions ={
        //   origin:'http://localhost:3000', 
        //   credentials:true,
        //   optionSuccessStatus:200
        // }



        // this.app.use(cors(corsOptions),()=>{
        //   console.log("Origin Accessed But denied");
          
        // });
        // this.app.use(cors());

        this.app.use(cors);
    }

    public async listen():Promise<void>{
        this.app.listen(this.port,()=>{
            console.log(`Server listening on http://localhost:${this.port}/`);
        });
    }
}

export default App;

function callback(arg0: null, arg1: boolean) {
  throw new Error("Function not implemented.");
}
