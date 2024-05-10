import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import { OtpDao } from '../dao/otpDao';
import { HOST,PORT,EMAIL,PASS } from "../constants/nodeMailerCredentials";

export class OtpServices{
    public static async generateOtp(){
        const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        return otp.toString();
    }

    public static async sendOtp (email:string,otp:string){
        const transporter =nodemailer.createTransport({
            host:HOST,
            port:PORT,
            auth:{
                user:EMAIL,
                pass:PASS
            }
        });

        transporter.sendMail({
            from: EMAIL,
            to: `${email}`,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });
    }

    public static async validateOtp (email:string, otp:string):Promise<boolean>{
        const user=await OtpDao.getUser(email);
        const currentTime=new Date().getTime();
        try{
            if(user.otp==otp && (currentTime - user.time) < 15*60)return true;
        }
        catch(err){console.log("error",err);}
        
        return true;
    }

    public static async getUserService(email:string){return OtpDao.getUser(email);}
    public static async addUserService(email:string,otp:string,time:number){return OtpDao.addUser(email,otp,time);}
    public static async updateUserService(email:string,otp:string,time:number){return OtpDao.updateUser(email,otp,time);}
}

