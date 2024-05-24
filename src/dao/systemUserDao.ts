import { SystemRow } from "../typings/system.types";
import { SystemUserModel } from "../models/systemUsersModel";

export class SystemUserDao{
    /*
    * Function to get system user
    */
    public static async getSystemUser (email:string):Promise<SystemRow|boolean>{
        try{
            const res= await SystemUserModel.findOne({email});
            return res;
        }catch(e){return false;}
        
    }
}
