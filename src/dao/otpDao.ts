import { OtpVerificationModel } from "../models/otpModel";

export class OtpDao{
    public static async getUser (email:string){
        try{
            return await OtpVerificationModel.findOne({email}).orFail() ;
        }catch(e){return null;}
        
    }

    public static async addUser (email:string,otp:string,time:number){
        try{
            return await OtpVerificationModel.insertMany([{email,otp,time}]);
        }catch(e){return null;}
    }

    public static async updateUser (email:string,otp:string,time:number){
        try{
            return await OtpVerificationModel.updateOne({email},{$set:{otp,time}});
        }catch(e){return null;}
    }

}
