import nodemailer from 'nodemailer';
import { OtpDao } from '../dao/otpDao';
import { UserDao } from '../dao/userDao';
import { HOST,PORT,EMAIL,PASS } from "../constants/nodeMailerCredentials";
import { OrganisationDao } from '../dao/organisationDao';
import { SystemUserDao } from '../dao/systemUserDao';
import { EmailOtpTime } from '../typings/otpTypings';

export class OtpServices{

    public static async getOrganisations():Promise<string[]>{
        const res=await OrganisationDao.getOrganisations();
        let result=[];
        for(let i=0;i<res.length;i++)result.push(res[i]['orgUniqName']);
        return result;
    }
    
    public static generateOtp():string{
        const otp = Math.floor((1+Math.random())*100000);
        return otp.toString();
    }

    public static async sendOtp (email:string,otp:string):Promise<void>{
        const transporter =nodemailer.createTransport({
            host:HOST,
            port:PORT,
            auth:{
                user:EMAIL,
                pass:PASS
            }
        });

        await transporter.sendMail({
            from: EMAIL,
            to: `${email}`,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });
    }

    public static async validateOtp (email:string, otp:string):Promise<boolean>{
        try{
            const user=await OtpDao.getUser(email);
            if(typeof user==='boolean')return false;
            const currentTime=new Date().getTime();
            if(user.otp==otp && (currentTime - user.time) < 15*60)return true;
        }
        catch(err){console.log("error",err);}
        
        return true;
    }

    public static async verifyUser(organisation:string,email:string):Promise<|string|boolean>{
        if(await UserDao.getUserByOrgUniqNameAndUserEmail(organisation,email)){
            const res=await OrganisationDao.getOrganisationByOrgUniqName(organisation);
            if(typeof res!=='boolean')return res.orgAdmin;
            return false;
        }
        return false;
    }

    public static async getSystemUser(email:string):Promise<boolean>{
        try{
            const org=await SystemUserDao.getSystemUser(email);
            if(!org) return false;
            return true;
        }catch(e){console.log("err",e);return false;}
    }
    

    public static async getOrganisationByOrgUniqName(organisation:string):Promise<string|boolean>{
        try{
            const res= await OrganisationDao.getOrganisationByOrgUniqName(organisation);
            if(typeof res!=='boolean')return res.orgAdmin;
            return false;
        }catch(e){console.log("err",e);return false;}
    }
    public static async getUserService(email:string):Promise<EmailOtpTime|boolean>{
        try{
            const res= await OtpDao.getUser(email);
            if(typeof res==='boolean')return false;
            return res;
        }catch(e){console.log("err",e);return false;}
    }
    public static async addUserService(obj:EmailOtpTime):Promise<boolean>{
        try{
            const res= await OtpDao.addUser(obj);
            return res;
        }catch(e){console.log("err",e);return false;}
    }
    public static async updateUserService(obj:EmailOtpTime){
        try{
            const res= await OtpDao.updateUser(obj);
            return res;
        }catch(e){console.log("err",e);return false;}
    }
    public static async getUserByOrgUniqNameAndUserEmail(organisation:string,email:string){
        try{
            const res= await UserDao.getUserByOrgUniqNameAndUserEmail(organisation,email);
            return res;
        }catch(e){console.log("err",e);return false;}
    }
}

