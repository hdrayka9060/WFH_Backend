import jwt from 'jsonwebtoken';
import { JwtPayloadType } from '../../typings/jwtTypings';
import {secretKey}  from "../../constants/jwtConstants";
import {NextFunction, Request,Response} from 'express';


export class JwtMiddleware{
    public static async jwtSign (data:JwtPayloadType):Promise<string>{
        return jwt.sign(data,secretKey,{expiresIn:'3600s'});
    }

    public static async jwtVerifySystemUser (req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        try {
            const bearer=req.headers.authorization;
            if(typeof bearer==='undefined')return res.send({status:400,message:"User not authorised"});

            const token=bearer.split(' ')[1];
            const data:JwtPayloadType=jwt.verify(token,secretKey) as JwtPayloadType;
            if(data.userType!=='system')return res.send({status:400,message:"User not autharised"});
    
            req.body.email=data.email;
            req.body.organisation=data.organisation;
            return next();
        }
        catch(err){
            return res.send({status:400,message:"User not verified"});
        }
    }

    public static async jwtVerifyAdminUser (req:Request,res:Response,next:NextFunction):Promise<Response|NextFunction>{
        try {
            const bearer=req.headers.authorization;
            if(typeof bearer==='undefined')return res.send({status:400,message:"User not authorised"});

            const token=bearer.split(' ')[1];
            const data:JwtPayloadType=jwt.verify(token,secretKey) as JwtPayloadType;
            if(data.userType!=='admin')return res.send({status:400,message:"User not autharised"});

            req.body.email=data.email;
            req.body.organisation=data.organisation;
            next();
        }
        catch(err){
            return res.send({status:400,message:"User not verified"});
        }
    }

    public static async jwtVerifyOrgUser (req:Request,res:Response,next:NextFunction):Promise<Response|NextFunction>{
        try {
            const bearer=req.headers.authorization;
            if(typeof bearer==='undefined')return res.send({status:400,message:"User not authorised"});

            const token=bearer.split(' ')[1];
            const data:JwtPayloadType=jwt.verify(token,secretKey) as JwtPayloadType;
            if(data.userType!=='user')return res.send({status:400,message:"User not autharised"});

            req.body.email=data.email;
            req.body.organisation=data.organisation;
            next();
        }
        catch(err){
            return res.send({status:400,message:"User not verified"});
        }
    }

}

