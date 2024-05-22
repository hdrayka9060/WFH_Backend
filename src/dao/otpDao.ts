import { EmailOtpTime } from "../typings/otpTypings";
import { OtpVerificationModel } from "../models/otpModel";

export class OtpDao{
    public static async getUser (email:string):Promise<EmailOtpTime|boolean>{
        try{
            const res= await OtpVerificationModel.findOne({email});
            return res;
        }catch(e){return false;}
        
    }

    public static async addUser (obj:EmailOtpTime):Promise<boolean>{
        try{
            await OtpVerificationModel.create({email:obj.email,otp:obj.otp,time:obj.time});
            return true;
        }catch(e){return false;}
    }

    public static async updateUser (obj:EmailOtpTime):Promise<boolean>{
        try{
            const res= await OtpVerificationModel.updateOne({email:obj.email},{$set:{otp:obj.otp,time:obj.time}});
            if(res.modifiedCount===1)return true;
            return false;
        }catch(e){return false;}
    }

}
