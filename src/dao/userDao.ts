import { AddUser, EditUser, UpdateUserWfh, UserRow } from "../typings/userTypings";
import { UserModel } from "../models/usersModel";

export class UserDao{

    /*
    * Function to users details by org unique name for pagination
    */
    public static async getSkipedUserByOrgUniqName (orgUniqName:string,page:number,limit:number):Promise<UserRow[]>{
        try{
            const skip=(page-1)*limit;
            const res:UserRow[]= await  UserModel.find({orgUniqName,deleted:false}).skip(skip).limit(limit).lean();
            return res;
        }catch(e){return [];}
    }

    /*
    * Function to get user details by org unique name
    */
    public static async getUserByOrgUniqName (orgUniqName:string):Promise<UserRow[]>{
        try{
            const res:UserRow[]= await  UserModel.find({orgUniqName,deleted:false}).lean();
            return res;
        }catch(e){return [];}
    }
    
    /*
    * Function to get user by org unique name and uaer email
    */
    public static async getUserByOrgUniqNameAndUserEmail (orgUniqName:string, userEmail:string):Promise<UserRow|boolean>{
        try{
            const res:UserRow= await  UserModel.findOne({orgUniqName:orgUniqName,userEmail:userEmail,deleted:false}).lean();
            return res;
        }catch(e){return false;}
        
    }

    /*
    * Function to add new user in orgaisation
    */
    public static async addUser (obj:AddUser):Promise<boolean>{
        try{
            const wfh=0;
            const dateOfJoining=new Date();  
            await  UserModel.create({userEmail:obj.userEmail,orgUniqName:obj.orgUniqName,firstName:obj.firstName,lastName:obj.lastName,dateOfBirth:obj.dateOfBirth,dateOfJoining,wfh,deleted:false});
            return true;
        }catch(e){return false;}
    }

    /*
    * Function to edit user detials
    */
    public static async editUser (obj:EditUser):Promise<boolean>{
        try{
            const res= await  UserModel.updateOne({userEmail:obj.userOldEmail,orgUniqName:obj.orgUniqName,deleted:false},{$set:{userEmail:obj.userEmail,firstName:obj.firstName,lastName:obj.lastName,dateOfBirth:obj.dateOfBirth}});
            return true;
        }catch(e){return false;}
    }

    /*
    * Function to delive user
    */
    public static async deliveUser (userEmail:string,orgUniqName:string):Promise<boolean>{
        try{
            const res= await  UserModel.updateOne({userEmail,orgUniqName,deleted:false},{$set:{deleted:true}});
            return true;
        }catch(e){return false;}
    } 
    
    /*
    * Function to update org unique name in users details
    */
    public static  async updateOrgUniqname(oldOrgUniqName:string,orgUniqName:string):Promise<boolean>{
        try{
            const res= await   UserModel.updateMany({orgUniqName:oldOrgUniqName,deleted:false},{$set:{orgUniqName}});
            return true;
        }catch(e){return false;}
    }

    /*
    * Function to update user wfh count
    */
    public static  async updateUserWfh(obj:UpdateUserWfh):Promise<boolean>{
        try{
            const res= await   UserModel.updateOne({orgUniqName:obj.orgUniqName,userEmail:obj.userEmail,deleted:false},{$set:{wfh:obj.wfh}});
            return true;
        }catch(e){return false;}
    }
}
