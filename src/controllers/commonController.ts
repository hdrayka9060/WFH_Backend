import { Request, Response } from "express";
import { CommonServices } from '../services/commonServices';
import { AddWfhRequestRequest, GetUserWfhRequest, GetWfhRequestsRequest } from "../typings/commonTypings";

export class CommonContoller {
    /*
    * Function to add new wfh request
    */
    public static async addWfhRequest(req: Request<{}, {}, AddWfhRequestRequest>, res: Response): Promise<Response> {
        try {
            const { email, organisation, availedAt, requestSubmissionReason } = req.body;
            const rejectionReason = "";
            const requestStatus = "Pending";
            const today = new Date();
            const createdAt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
            const obj = { orgUniqName: organisation, userEmail: email, rejectionReason, wfhReason: requestSubmissionReason, requestStatus, availedAt, createdAt }
            const result = await CommonServices.addWfhRequest(obj);
            if (result) return res.send({ message: "Requested Accepted", error:"" ,ok:true});
            else return res.send({ message: "Failed to Accepted", error:"",ok:false });
        }
        catch (err) {
            console.log("requestWfh err", err);
            return res.status(500).send({ message: "Something went wrong", error:JSON.stringify(err),ok:false });
        }
    }

    /*
    * Function to get users wfh count
    */
    public static async getUserWfh(req: Request<{}, {}, GetUserWfhRequest>, res: Response): Promise<Response> {
        try {
            const { email, organisation } = req.body;
            const result = await CommonServices.getUsersWfh(organisation, email);
            if (typeof result !== 'boolean') return res.send({ message: "Success", wfh: result.wfh, maxWfh: result.maxWfh, error:"",ok:true });
            else return res.send({ message: "Something went wrong", error:"",ok:false });
        }
        catch (err) {
            console.log("userWfh err", err);
            return res.status(500).send({ message: "Something went wrong", error:JSON.stringify(err),ok:false });
        }
    }

    /*
    * Function to get users past wfh request
    */
    public static async getWfhRequests(req: Request<{}, {}, GetWfhRequestsRequest>, res: Response): Promise<Response> {
        try {
            const { email, organisation,year,month } = req.body;
            const result = await CommonServices.getWfhRequestsData(organisation, email,year,month);
            if (typeof result !== 'boolean') return res.send({ data: result.result, maxWfh: result.maxWfh, message: "Success", error:"",ok:true });
            else return res.send({ data: [], wfh: 0, maxWfh: 0, message: "Faild to fetch", error:"",ok:false });
        }
        catch (err) {
            console.log("calender err", err);
            return res.status(500).send({ data: [], message: "Something went wrong", error:JSON.stringify(err),ok:false });
        }
    }
}
