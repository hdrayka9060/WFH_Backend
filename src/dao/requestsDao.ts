import { AddRequest, RequestsRow, UpdateRequest } from "../typings/requestsTypings";
import { RequestsModel } from "../models/requestsModel";

export class RequestsDao{
    public static async getRequestsByOrgUniqNameAndUserEmail(orgUniqName:string,userEmail:string):Promise<RequestsRow[]|boolean>{
        try{
            const res:RequestsRow[]= await RequestsModel.find({orgUniqName,userEmail,deleted:false});
            return res;
        }catch(e){return false;}
    }

    public static async getRequestsByOrgUniqNameAndRequestStatus(orgUniqName:string,requestStatus:string):Promise<RequestsRow[]|boolean>{
        try{
            const res:RequestsRow[]= await RequestsModel.find({orgUniqName,requestStatus,deleted:false});
            return res;
        }catch(e){return false;}
    }

    public static async getRequestsByOrgUniqNameAndAvailedAt(orgUniqName:string,availedAt:Date):Promise<RequestsRow[]|boolean>{
        try{
            const res:RequestsRow[]= await RequestsModel.find({orgUniqName,availedAt,deleted:false});
            return res;
        }catch(e){return false;}
    }

    public static async getRequestsByOrgUniqNameAndCreatedAt(orgUniqName:string,createdAt:Date):Promise<RequestsRow[]|boolean>{
        try{
            const res:RequestsRow[]= await RequestsModel.find({orgUniqName,createdAt,deleted:false});
            return res;
        }catch(e){return false;}
    }

    public static async addRequest(obj:AddRequest):Promise<boolean>{
        try{
            await RequestsModel.create({orgUniqName:obj.orgUniqName,userEmail:obj.userEmail,requestStatus:obj.requestStatus, rejectionReason:obj.rejectionReason, wfhReason:obj.wfhReason, deleted:false,createdAt:obj.createdAt,availedAt:obj.availedAt});
            return true;
        }catch(e){return false;}
    }

    public static async updateRequestByOrgUniqNameAndUserEmailAndUserAndAvailedAtAndRequestStatus(obj:UpdateRequest):Promise<boolean>{
        try{
            const approvalAt=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0,0,0,0);
            const res= await RequestsModel.updateOne({orgUniqName:obj.orgUniqName,userEmail:obj.userEmail,availedAt:obj.availedAt,requestStatus:obj.oldRequestStatus,deleted:false},{$set:{rejectionReason:obj.rejectionReason, approvalAt, requestStatus:obj.requestStatus}})
            if(res.modifiedCount===1)return true;
            return false;
        }catch(e){return false;}
    }   
    public static  async updateOrgUniqname(oldOrgUniqName:string,orgUniqName:string):Promise<boolean>{
        try{
            const res=await  RequestsModel.updateMany({orgUniqName:oldOrgUniqName,deleted:false},{$set:{orgUniqName}});
            if(res.modifiedCount>0)return true;
            return false;
        }catch(e){return false;}
    }
}
