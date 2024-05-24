import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { JwtPayloadType } from '../../typings/jwtTypings';
import {NextFunction, Request,Response} from 'express';

dotenv.config()

export class JwtMiddleware{
    /*
    * Function to sign jwt token
    */
    public static async jwtSign (data:JwtPayloadType):Promise<string>{
        return jwt.sign(data,process.env.SECRET_KEY,{expiresIn:'3600s'});
    }

    /*
    * Function to verify token jwt token for system user
    */
    public static async jwtVerifySystemUser (req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        try {
            const bearer=req.headers.authorization;
            if(typeof bearer==='undefined')return res.send({status:400,message:"User not authorised"});

            const token=bearer.split(' ')[1];
            const data:JwtPayloadType=jwt.verify(token,process.env.SECRET_KEY) as JwtPayloadType;
            if(data.userType!=='system')return res.send({status:400,message:"User not autharised"});
            
            req.body.email=data.email;
            req.body.organisation=data.organisation;
            return next();
        }
        catch(err){
            return res.send({status:400,message:"User not verified"});
        }
    }

    /*
    * Function to veriy token jwt for admin user
    */
    public static async jwtVerifyAdminUser (req:Request,res:Response,next:NextFunction):Promise<Response|NextFunction>{
        try {
            const bearer=req.headers.authorization;
            if(typeof bearer==='undefined')return res.send({status:400,message:"User not authorised"});

            const token=bearer.split(' ')[1];
            const data:JwtPayloadType=jwt.verify(token,process.env.SECRET_KEY) as JwtPayloadType;
            if(data.userType!=='admin')return res.send({status:400,message:"User not autharised"});

            req.body.email=data.email;
            req.body.organisation=data.organisation;
            next();
        }
        catch(err){
            return res.send({status:400,message:"User not verified"});
        }
    }

    /*
    * Function to verify token jwt for normal user
    */
    public static async jwtVerifyOrgUser (req:Request,res:Response,next:NextFunction):Promise<Response|NextFunction>{
        try {
            const bearer=req.headers.authorization;
            if(typeof bearer==='undefined')return res.send({status:400,message:"User not authorised"});

            const token=bearer.split(' ')[1];
            const data:JwtPayloadType=jwt.verify(token,process.env.SECRET_KEY) as JwtPayloadType;
            if(!(data.userType==='user'||data.userType==='admin'))return res.send({status:400,message:"User not autharised"});

            req.body.email=data.email;
            req.body.organisation=data.organisation;
            next();
        }
        catch(err){
            return res.send({status:400,message:"User not verified"});
        }
    }

}

