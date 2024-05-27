import {Request,Response} from "express";
import { OtpServices } from "../services/otpServices";
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { SendOtpRequest, VerifyOtpRequest, VerifySystemUserRequest, VerifyUserOrgRequest, VerifyUserRequest } from "../typings/otpTypings";

export class OtpController{

    /*
    * Function to send otp
    */
    public static async sendOtp (req:Request<{},{},SendOtpRequest>,res:Response):Promise<Response>  {
        try{
            const {email}=  req.body;
            const time=new Date().getTime();
            const otp=OtpServices.generateOtp().toString();
            await OtpServices.sendOtp(email,otp);
            const user=await OtpServices.getUser(email);
            if(user)await OtpServices.updateUser({email,otp,time});
            else await OtpServices.addUser({email,otp,time});
            return res.send({message:"Otp Sent", error:"",ok:true});
        }
        catch(err){
            console.log("sendOtp err",err);
            return res.status(500).send({message:"Some thing went wrong", error:JSON.stringify(err),ok:false});
        }
    }

    /*
    * Function to get organisation
    */
    public static async getOrganisations (req:Request<{},{},{}>,res:Response):Promise<Response>  {
        try{
            const result=await OtpServices.getOrganisations();
            return res.send({message:"Success",data:result, error:"",ok:true});
        }
        catch(err){
            console.log("getOrg err",err);
            return res.status(500).send({message:"Some thing went wrong",data:[], error:JSON.stringify(err),ok:false});
        }
    }

    /*
    * Function to verify otp
    */
    public static async verifyOtp (req:Request<{},{},VerifyOtpRequest>,res:Response):Promise<Response>{
        try{
            const {email,otp,userType,organisation}=  req.body;
            const time=new Date().getTime();
            const user=await OtpServices.getUser(email);
            if(typeof user==='boolean'){
                return res.send({message:"Email Not Found",token:'', error:"",ok:false});
            }
            else if(user.otp==otp && (user.time-time)<15*60){
                const token=await JwtMiddleware.jwtSign({email,userType,organisation});
                return res.send({message:"User Verified",token:token, error:"",ok:true});
            }
            else{
                return res.send({message:"Something went wrong",token:'', error:"",ok:false});
            }
        }
        catch(err){
            console.log("verifyOtp err",err);
            return res.status(500).send({message:"Something went wrong", error:JSON.stringify(err),ok:false});
        }
    }

    /*
    * Function to verify users selected organisation
    */
    public static async verifyUserOrg(req:Request<{},{},VerifyUserOrgRequest>,res:Response):Promise<Response>{
        try{
            const {organisation}=  req.body;
            const user=await OtpServices.getOrganisationByOrgUniqName(organisation);
            if(user)return res.send({admin:user, error:"",ok:true});
            else return res.send({admin:"", error:"",ok:false});
        }
        catch(err){
            console.log("verifyUserOrg err",err);
            return res.status(500).send({admin:"", error:JSON.stringify(err),ok:false});
        }
    }

    /*
    * Function to verify user emails
    */
    public static async verifyUser(req:Request<{},{},VerifyUserRequest>,res:Response):Promise<Response>{
        try{
            const {email,organisation}=  req.body;
            const user=await OtpServices.verifyUser(organisation,email);
            if(user)return res.send({admin:user, error:"",ok:true});
            else return res.send({admin:"", error:"",ok:false});
        }
        catch(err){
            console.log("verifyUser err",err);
            return res.status(500).send({admin:"", error:JSON.stringify(err),ok:false});
        }
    }

    /*
    * Function to verify system user
    */
    public static async verifySystemUser (req:Request<{},{},VerifySystemUserRequest>,res:Response):Promise<Response>{
        try{
            const {systemUserEmail}=req.body;
            const result=await OtpServices.verifySystemUser(systemUserEmail);
            if(result)return res.send({message:"User Found", error:"",ok:true});
            else return res.send({message:"User Not Found", error:"",ok:false});
        }
        catch(err){
            console.log("verifySystemUser err",err);
            return res.status(500).send({message:err.message, error:JSON.stringify(err),ok:false});
        }
    }

}
