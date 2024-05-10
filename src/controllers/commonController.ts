import {Request,Response} from "express";
import {CommonServices} from '../services/commonServices';

export class CommonContoller{
    public static async requestWfh (req:Request,res:Response){
        try{
            const {orgUniqName,userEmail,wfhReason,availedAtDay,availedAtMonth,availedAtYear}=req.body;
            const rejectionReason="";
            const requestStatus="pending";
            const approvalAtDay=0;
            const approvalAtMonth=0;
            const approvalAtYear=0;
            
            const date=new Date();
            const createdAtDay=date.getDate();
            const createdAtMonth=date.getMonth();
            const createdAtYear=date.getFullYear();

            const result=await CommonServices.requestWfhService(
                orgUniqName,userEmail,rejectionReason,wfhReason,requestStatus,
                availedAtDay,   availedAtMonth,  availedAtYear, 
                approvalAtDay,  approvalAtMonth, approvalAtYear, 
                createdAtDay,   createdAtMonth,  createdAtYear 
            );
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async calender (req:Request,res:Response){
        try{
            const {orgUniqName,userEmail}=req.body;
            const result=await CommonServices.getCalenderData(orgUniqName,userEmail);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }    
}
