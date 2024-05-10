import { RequestsModel } from "../models/requestsModel";

export class RequestsDao{
    public static async getRequestsByOrgUniqNameAndUserEmail(orgUniqName:string,userEmail:string){
        try{
            return await RequestsModel.find({orgUniqName,userEmail,deleted:false}).orFail() ;
        }catch(e){return null;}
    }

    public static async getRequestsByOrgUniqNameAndRequestStatus(orgUniqName:string,requestStatus:string){
        try{
            return await RequestsModel.find({orgUniqName,requestStatus,deleted:false}).orFail() ;
        }catch(e){return null;}
    }

    public static async addRequest(
        orgUniqName:string,    userEmail:string,       rejectionReason:string, wfhReason:string,  requestStatus:string,  
        availedAtDay:number,   availedAtMonth:number,  availedAtYear:number, 
        approvalAtDay:number,  approvalAtMonth:number, approvalAtYear:number, 
        createdAtDay:number,   createdAtMonth:number,  createdAtYear:number 
    ){
        try{
            return await RequestsModel.insertMany([{orgUniqName,userEmail,requestStatus, rejectionReason, wfhReason, deleted:false,
                approvalAtDay,approvalAtMonth,approvalAtYear,createdAtDay,createdAtMonth,createdAtYear,availedAtDay,availedAtMonth,availedAtYear
            }]);
        }catch(e){return null;}
    }

    public static async updateRequestByOrgUniqNameAndUserEmailAndUserAndAvailedAtAndRequestStatus(
        orgUniqName:string,     userEmail:string,        requestStatus:string,   
        availedAtDay:number,    availedAtMonth:number,   availedAtYear:number,
        rejectionReason:string, oldRequestStatus:string
    ){
        try{
            const date=new Date();
            const approvalAtDay=date.getDate();
            const approvalAtMonth=date.getMonth();
            const approvalAtYear=date.getFullYear();
            return await RequestsModel.updateOne({orgUniqName,userEmail,availedAtDay,availedAtMonth,availedAtYear,requestStatus:oldRequestStatus,deleted:false},{$set:{rejectionReason:rejectionReason, approvalAtDay,approvalAtMonth,approvalAtYear, requestStatus}})
        }catch(e){return null;}
    }   
}
