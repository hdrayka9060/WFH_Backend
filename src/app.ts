import App from "./config/config";
import { DATABASE_URL } from "./constants/databaseUrl";

import './dao/connectDB';

const initializeApp = async () => {
    try {
        const app = new App();
        app.listen();
    }catch(err){
        console.log("Error while listing or  connnecting database",err.message);
        throw new Error("Error while listing or  connnecting database");
    }
  };

initializeApp();