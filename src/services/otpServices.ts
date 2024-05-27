import nodemailer from 'nodemailer';
import { OtpDao } from '../dao/otpDao';
import { UserDao } from '../dao/userDao';
// import { HOST,PORT,EMAIL,PASS } from "../constants/nodeMailerCredentials";
import dotenv from 'dotenv'
import { OrganisationDao } from '../dao/organisationDao';
import { SystemUserDao } from '../dao/systemUserDao';
import { EmailOtpTime } from '../typings/otpTypings';

dotenv.config()

export class OtpServices{

    /*
    * Function to get organisation
    */
    public static async getOrganisations():Promise<string[]>{
        const res=await OrganisationDao.getOrganisationsUniqueName();
        let result=[];
        for(let i=0;i<res.length;i++)result.push(res[i]['orgUniqName']);
        return result;
    }
    
    /*
    * Function to generate oto
    */
    public static generateOtp():string{
        const otp = Math.floor((1+Math.random())*100000);
        return otp.toString();
    }

    /*
    * Function to send otp
    */
    public static async sendOtp (email:string,otp:string):Promise<void>{
        const transporter =nodemailer.createTransport({
            host:process.env.HOST,
            port:Number(process.env.PORT),
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: `${email}`,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });
    }

    /*
    * Function to verify otp
    */
    public static async verifyOtp (email:string, otp:string):Promise<boolean>{
        try{
            const user=await OtpDao.getUserOtp(email);
            if(typeof user==='boolean')return false;
            const currentTime=new Date().getTime();
            if(user.otp==otp && (currentTime - user.time) < 15*60)return true;
        }
        catch(err){console.log("error",err);}
        
        return true;
    }

    /*
    * Function to verify user
    */
    public static async verifyUser(organisation:string,email:string):Promise<|string|boolean>{
        if(await UserDao.getUserByOrgUniqNameAndUserEmail(organisation,email)){
            const res=await OrganisationDao.getOrganisationByOrgUniqName(organisation);
            if(typeof res!=='boolean')return res.orgAdmin;
            return false;
        }
        return false;
    }

    /*
    * Function to verify system user
    */
    public static async verifySystemUser(email:string):Promise<boolean>{
        try{
            const org=await SystemUserDao.getSystemUser(email);
            if(!org) return false;
            return true;
        }catch(e){console.log("err",e);return false;}
    }
    

    /*
    * Function to get organisation
    */
    public static async getOrganisationByOrgUniqName(organisation:string):Promise<string|boolean>{
        try{
            const res= await OrganisationDao.getOrganisationByOrgUniqName(organisation);
            if(typeof res!=='boolean')return res.orgAdmin;
            return false;
        }catch(e){console.log("err",e);return false;}
    }

    /*
    * Function to get user otp and timestamp
    */
    public static async getUser(email:string):Promise<EmailOtpTime|boolean>{
        try{
            const res= await OtpDao.getUserOtp(email);
            if(typeof res==='boolean')return false;
            return res;
        }catch(e){console.log("err",e);return false;}
    }

    /*
    * Function to add new users otp and timestamps
    */
    public static async addUser(obj:EmailOtpTime):Promise<boolean>{
        try{
            const res= await OtpDao.addUserOtp(obj);
            return res;
        }catch(e){console.log("err",e);return false;}
    }

    /*
    * Function to update users otp and timestamp 
    */
    public static async updateUser(obj:EmailOtpTime){
        try{
            const res= await OtpDao.updateUserOtp(obj);
            return res;
        }catch(e){console.log("err",e);return false;}
    }

    /*
    * Function to get user by organisation unique name
    */
    public static async getUserByOrgUniqNameAndUserEmail(organisation:string,email:string){
        try{
            const res= await UserDao.getUserByOrgUniqNameAndUserEmail(organisation,email);
            return res;
        }catch(e){console.log("err",e);return false;}
    }
}

