import {Request,Response} from "express";
import {AdminServices} from '../services/adminServices';

export class AdminController{
    public static async requestList (req:Request,res:Response){
        try{
            const {orgUniqName}=req.body;
            const result=await AdminServices.getRequestList(orgUniqName);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async acceptRequest (req:Request,res:Response){
        try{

            const {orgUniqName,userEmail,availedAtDay,availedAtMonth,availedAtYear,rejectionReason}=req.body;
            const requestStatus="accept";
            const oldRequestStatus='pending';
            const result=await AdminServices.updateRequestService(orgUniqName,userEmail,requestStatus,availedAtDay,availedAtMonth,availedAtYear,rejectionReason,oldRequestStatus);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async rejectRequest (req:Request,res:Response){
        try{
            const {orgUniqName,userEmail,availedAtDay,availedAtMonth,availedAtYear,rejectionReason}=req.body;
            const requestStatus="reject";
            const oldRequestStatus='pending';
            const result=await AdminServices.updateRequestService(orgUniqName,userEmail,requestStatus,availedAtDay,availedAtMonth,availedAtYear,rejectionReason,oldRequestStatus);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }    
}
