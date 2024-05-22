import { AddUser, EditUser, UpdateUserWfh, UserRow } from "../typings/userTypings";
import { UserModel } from "../models/usersModel";

export class UserDao{
    public static async getUserByOrgUniqName (orgUniqName:string):Promise<UserRow[]>{
        try{
            const res:UserRow[]= await  UserModel.find({orgUniqName,deleted:false});
            return res;
        }catch(e){return [];}
    }

    public static async getUserByOrgUniqNameAndUserEmail (orgUniqName:string, userEmail:string):Promise<UserRow>{
    
            const res:UserRow= await  UserModel.findOne({orgUniqName:orgUniqName,userEmail:userEmail,deleted:false});
            return res;
        
    }

    public static async addUser (obj:AddUser):Promise<boolean>{
        try{
            const wfh=0;
            const dateOfJoining=new Date();  
            await  UserModel.create({userEmail:obj.userEmail,orgUniqName:obj.orgUniqName,firstName:obj.firstName,lastName:obj.lastName,dateOfBirth:obj.dateOfBirth,dateOfJoining,wfh,deleted:false});
            return true;
        }catch(e){return false;}
    }

    public static async editUser (obj:EditUser):Promise<boolean>{
        try{
            const res= await  UserModel.updateOne({userEmail:obj.userOldEmail,orgUniqName:obj.orgUniqName,deleted:false},{$set:{userEmail:obj.userEmail,firstName:obj.firstName,lastName:obj.lastName,dateOfBirth:obj.dateOfBirth}});
            if(res.modifiedCount===1)return true;
            return false;
        }catch(e){return false;}
    }

    public static async deleteUser (userEmail:string,orgUniqName:string):Promise<boolean>{
        try{
            const res= await  UserModel.updateOne({userEmail,orgUniqName,deleted:false},{$set:{deleted:true}});
            if(res.modifiedCount===1)return true;
            return false;
        }catch(e){return false;}
    } 
    
    public static  async updateOrgUniqname(oldOrgUniqName:string,orgUniqName:string):Promise<boolean>{
        try{
            const res= await   UserModel.updateMany({orgUniqName:oldOrgUniqName,deleted:false},{$set:{orgUniqName}});
            if(res.modifiedCount>0)return true;
            return false;
        }catch(e){return false;}
    }

    public static  async updateUserWfh(obj:UpdateUserWfh):Promise<boolean>{
        try{
            const res= await   UserModel.updateOne({orgUniqName:obj.orgUniqName,userEmail:obj.userEmail,deleted:false},{$set:{wfh:obj.wfh}});
            if(res.modifiedCount===1)return true;
            return false;
        }catch(e){return false;}
    }
}
