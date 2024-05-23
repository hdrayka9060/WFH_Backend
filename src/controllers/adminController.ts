import { Request, Response } from "express";
import { AdminServices } from '../services/adminServices';
import { TypedRequestBody } from "../typings/adminTypings";

export class AdminController {
    public static async requestList(req: Request, res: Response):Promise<Response> {
        try {
            const { organisation,page,limit } = req.body;
            const result = await AdminServices.getRequestList(organisation,page,limit);
            const totalRecords=await AdminServices.getRequestListCount(organisation);
            // console.log('result',result)
            return res.send({ status: 200, data: result, messsage: "Success", totalRecords:totalRecords });
        }
        catch (err) {
            return res.send({ status: 400, data: [], message: "Something went wrong" });
        }
    }

    public static async usersList(req: Request, res: Response):Promise<Response> {
        try {
            const { organisation } = req.body;
            const result = await AdminServices.getUsersList(organisation);
            return res.send({ status: 200, data: result, messsage: "Success" });
        }
        catch (err) {
            return res.send({ status: 400, data: [], message: "Something went wrong" });
        }
    }

    public static async filterRequestList(req: Request, res: Response):Promise<Response> {
        try {
            const { organisation,filterType,requestStatus,user,date,page,limit } = req.body;
            // console.log(organisation,filterType,requestStatus,user,date);
            const obj={orgUniqName:organisation,filterType,requestStatus,user,date,page,limit};
            const result = await AdminServices.getFilterRequestList(obj);
            return res.send({ status: 200, data: result, messsage: "Success" });
        }
        catch (err) {
            return res.send({ status: 400, data: [], message: "Something went wrong" });
        }
    }

    public static async acceptRequest(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUserEmail, organisation, availedAt } = req.body;
            const requestStatus = "Approved";
            const oldRequestStatus = 'Pending';
            const rejectionReason = '';
            const obj={orgUniqName:organisation,userEmail:organisationUserEmail,requestStatus, availedAt, rejectionReason, oldRequestStatus}
            const result = await AdminServices.updateRequestService(obj);
            if (result) return res.send({ status: 200, message: "Requested Accepted" });
            else return res.send({ status: 400, message: "Failed to Accepted" });
        }
        catch (err) {
            return res.send({ status: 400, message: "Failed to Accepted" });
        }
    }

    public static async rejectRequest(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUserEmail, organisation, availedAt, requestRejectionReason } = req.body;
            const requestStatus = "Rejected";
            const oldRequestStatus = 'Pending';
            const obj={orgUniqName:organisation, userEmail:organisationUserEmail, requestStatus, availedAt, rejectionReason:requestRejectionReason, oldRequestStatus}
            const result = await AdminServices.updateRequestService(obj);
            if (result) return res.send({ status: 200, message: "Requested Rejected" });
            else return res.send({ status: 400, message: "Failed to Reject" });
        }
        catch (err) {
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }
}
