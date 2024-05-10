import {Request,Response} from "express";
import { OtpServices } from "../services/otpServices";

export class OtpController{
    public static async getOtp (req:Request,res:Response)  {
        try{
            const {email}=  req.body;
            console.log("email",email)
            const time=new Date().getTime();
            const otp=OtpServices.generateOtp().toString();
            await OtpServices.sendOtp(email,otp);
            const user=await OtpServices.getUserService(email);
            if(user)await OtpServices.updateUserService(email,otp,time);
            else await OtpServices.addUserService(email,otp,time);
            res.send({"success":true});
        }
        catch(err){
            console.log("getOtp err",err);
            res.send({"success":false});
            // throw new Error(err);
        }
    }

    public static async verifyOtp (req:Request,res:Response){
        try{
            const {email,otp}=  req.body;
            const time=new Date().getTime();
            const user=await OtpServices.getUserService(email);
            if(!user){
                console.log("verification  failed")
                res.send({"success":false});
                }
            else if(user.otp==otp && (user.time-time)<15*60){
                console.log("verification  successful")
                res.send({"success":true});
            }
            else{
                console.log("verification  failed")
                res.send({"success":false});
            }        
        }
        catch(err){
            console.log("verifyOtp err",err);
            res.send({"success":false});
            // throw new Error(err);
        }
    }
}
