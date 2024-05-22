import {NextFunction, Request,Response} from 'express';
import { ZodSchema } from 'zod';

export class ZodMiddleware{
    public static zodValidation(schema:ZodSchema):(req:Request,res:Response,next:NextFunction)=>Promise<Response|void>{
        return async (req:Request,res:Response,next:NextFunction):Promise<Response|void>=>{
            try{
                // console.log("body",req.body)
                const pasrseBody=await schema.parseAsync(req.body);
                req.body=pasrseBody;
                return next();
            }
            catch(err){
                // console.log("zod validation err: ",err)
                return res.send({status:400,message:"Invalid Data"})
            }
        }
    }
}