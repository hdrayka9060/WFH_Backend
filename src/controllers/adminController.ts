import { Request, Response } from "express";
import { AdminServices } from '../services/adminServices';
import { AcceptRequestRequest, GetFilterRequestListRequest, GetRequestListRequest, GetUsersListRequest, RejectRequestRequest } from "../typings/adminTypings";

export class AdminController {

    /*
    * Fetching the wfh requests raised in organisation
    */
    public static async getRequestsList(req: Request<{}, {}, GetRequestListRequest>, res: Response): Promise<Response> {
        try {
            const {email, organisation } = req.body;
            const page=1;
            const limit=1000;
            const result = await AdminServices.getRequestList(organisation,page,limit);
            const totalRecords = await AdminServices.getRequestListCount(organisation);
            return res.send({ data: result, messsage: "Success", totalRecords: totalRecords, error:"",ok:true });
        }
        catch (err) {
            console.log("requestList err", err);
            return res.status(500).send({ data: [], message: "Something went wrong", error:JSON.stringify(err),ok:false });
        }
    }

    /*
    * Fetching email of users in given organisation
    */
    public static async getUsersList(req: Request<{}, {}, GetUsersListRequest>, res: Response): Promise<Response> {
        try {
            const { organisation } = req.body;
            const result = await AdminServices.getUsersList(organisation);
            return res.send({ data: result, messsage: "Success", error:"",ok:true });
        }
        catch (err) {
            console.log("usersList err", err);
            return res.status(500).send({ data: [], message: "Something went wrong", error:JSON.stringify(err),ok:false });
        }
    }

    /*
    * Fetching filtered wfh requests
    */
    public static async getFilteredRequestList(req: Request<{}, {}, GetFilterRequestListRequest>, res: Response): Promise<Response> {
        try {
            const { organisation, filterType, requestStatus, user, date } = req.body;
            const page=1;
            const limit=1000;
            const obj = { orgUniqName: organisation, filterType, requestStatus, user, date, page, limit };
            const result = await AdminServices.getFilterRequestList(obj);
            return res.send({ data: result, messsage: "Success", error:"",ok:true });
        }
        catch (err) {
            console.log("filterRequestList err", err);
            return res.status(500).send({ data: [], message: "Something went wrong", error:JSON.stringify(err),ok:false });
        }
    }

    /*
    * Function to accept wfh request
    */
    public static async acceptRequest(req: Request<{}, {}, AcceptRequestRequest>, res: Response): Promise<Response> {
        try {
            const { organisationUserEmail, organisation, availedAt } = req.body;
            const requestStatus = "Approved";
            const oldRequestStatus = 'Pending';
            const rejectionReason = '';
            const obj = { orgUniqName: organisation, userEmail: organisationUserEmail, requestStatus, availedAt, rejectionReason, oldRequestStatus }
            const result = await AdminServices.updateRequestService(obj);
            if (result) return res.send({ message: "Requested Accepted",error:"",ok:true });
            else return res.send({ message: "Failed to Accepted", error:"" ,ok:false});
        }
        catch (err) {
            console.log("acceptRequest err", err);
            return res.status(500).send({ message: "Failed to Accepted", error:JSON.stringify(err) ,ok:false});
        }
    }

    /*
   * Function to reject wfh request
   */
    public static async rejectRequest(req: Request<{}, {}, RejectRequestRequest>, res: Response): Promise<Response> {
        try {
            const { organisationUserEmail, organisation, availedAt, requestRejectionReason } = req.body;
            const requestStatus = "Rejected";
            const oldRequestStatus = 'Pending';
            const obj = { orgUniqName: organisation, userEmail: organisationUserEmail, requestStatus, availedAt, rejectionReason: requestRejectionReason, oldRequestStatus }
            const result = await AdminServices.updateRequestService(obj);
            if (result) return res.send({ message: "Requested Rejected", error:"",ok:true });
            else return res.send({ message: "Failed to Reject", error:"",ok:false });
        }
        catch (err) {
            console.log("rejectRequest err", err);
            return res.status(500).send({ message: "Something went wrong", error:JSON.stringify(err),ok:false });
        }
    }
}
