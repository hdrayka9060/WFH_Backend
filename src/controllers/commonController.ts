import {Request,Response} from "express";
import {CommonServices} from '../services/commonServices';

export class CommonContoller{
    public static async requestWfh (req:Request,res:Response):Promise<Response>{
        try{
            const {email,organisation,availedAt,requestSubmissionReason}=req.body;
            const rejectionReason="";
            const requestStatus="Pending";
            const today=new Date();
            const createdAt=new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0,0);
            const obj={orgUniqName:organisation,userEmail:email,rejectionReason,wfhReason:requestSubmissionReason,requestStatus,availedAt,createdAt}
            const result=await CommonServices.requestWfhService(obj);
            if(result) return res.send({status:200,message:"Requested Accepted"});
            else return res.send({status:400,message:"Failed to Accepted"});
        }
        catch(err){
            return res.send({status:400,message:"Something went wrong"});
        }
    }

    public static async userWfh (req:Request,res:Response):Promise<Response>{
        try{
            const {email,organisation}=req.body;
            const result=await CommonServices.userWfhService(organisation,email);
            if(typeof result!=='boolean') return res.send({status:200,message:"Success",wfh:result.wfh,maxWfh:result.maxWfh});
            else return res.send({status:400,message:"Something went wrong"});
        }
        catch(err){
            return res.send({status:400,message:"Something went wrong"});
        }
    }

    public static async calender (req:Request,res:Response):Promise<Response>{
        try{
            const {email,organisation}=req.body;
            const result=await CommonServices.getCalenderData(organisation,email);
            if(typeof result!=='boolean')return res.send({status:200,data:result.result,wfh:result.wfh,maxWfh:result.maxWfh,message:"Success"});
            else return res.send({status:400,data:[],wfh:0,maxWfh:0,message:"Faild to fetch"});
        }
        catch(err){
            return res.send({status:402,data:[],message:"Something went wrong"});
        }
    }    
}
