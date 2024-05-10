import { UserModel } from "../models/usersModel";

export class UserDao{
    public static async getUserByOrgUniqName (orgUniqName:string){
        try{
            return await UserModel.find({orgUniqName,deleted:false}).orFail() ;
        }catch(e){return null;}
    }

    public static async getUserByOrgUniqNameAndUserEmail (orgUniqName:string, userEmail:string){
        try{
            return await UserModel.findOne({orgUniqName,userEmail,deleted:false}).orFail() ;
        }catch(e){return null;}
    }

    public static async addUser (
            userId:string,      userEmail:string,    orgUniqName:string,    firstName:string,   lastName:string,
            dateOfBirthDay:number,      dateOfBirthMonth:number,    dateOfBirthYear:number,
            dateOfJoiningDay:number,    dateOfJoiningMonth:number,  dateOfJoiningYear:number
        ){
        try{
            return await UserModel.insertMany([{userId,userEmail,orgUniqName,firstName,lastName,dateOfBirthDay,dateOfBirthMonth,dateOfBirthYear,dateOfJoiningDay,dateOfJoiningMonth,dateOfJoiningYear,wfh:0,deleted:false}]);
        }catch(e){return null;}
    }

    public static async deleteUser (userEmail:string,    orgUniqName:string){
        try{
            return await UserModel.updateOne({userEmail,orgUniqName,deleted:false},{$set:{deleted:true}});
        }catch(e){return null;}
    }    
}
