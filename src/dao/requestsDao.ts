import { AddRequest, RequestsRow, UpdateRequest } from "../typings/requestsTypings";
import { RequestsModel } from "../models/requestsModel";

export class RequestsDao {

    /*
    * Function to get limited Requests by org unique name and user email for pagination
    */
    public static async getSkipedRequestsByOrgUniqNameAndUserEmail(orgUniqName: string, userEmail: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const res = await RequestsModel.find({ orgUniqName, userEmail, deleted: false }).skip(skip).limit(limit).lean();
        return res;
    }

    /*
    * Function to get Requests by org unique name and user email
    */
    public static async getRequestsByOrgUniqNameAndUserEmailAndDates(orgUniqName: string, userEmail: string,year:number,month:number): Promise<RequestsRow[]> {
        const res: RequestsRow[] = await RequestsModel.find({ orgUniqName, userEmail,availedAt:{$gte:new Date(year,month,1,0,0,0,0),$lt:new Date(year,month+1,1,0,0,0,0)}, deleted: false }).lean();
        return res;
    }

    /*
    * Function to get organisations count
    */
    public static async getOrganisationsCount(orgUniqName: string): Promise<number> {
        const totalRecords = await RequestsModel.countDocuments({ orgUniqName: orgUniqName, deleted: false })
        return totalRecords;
    }

    /*
    * Function to get requests by org unique name and request status
    */
    public static async getRequestsByOrgUniqNameAndRequestStatus(orgUniqName: string, requestStatus: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const res = await RequestsModel.find({ orgUniqName, requestStatus, deleted: false }).skip(skip).limit(limit).lean();
        return res;
    }

    /*
    * Function to get requests by org unique name and availed at
    */
    public static async getRequestsByOrgUniqNameAndAvailedAt(orgUniqName: string, availedAt: Date, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const res = await RequestsModel.find({ orgUniqName, availedAt, deleted: false }).skip(skip).limit(limit).lean();
        return res;
    }

    /*
    * Function to get requests by org unique name and created at
    */
    public static async getRequestsByOrgUniqNameAndCreatedAt(orgUniqName: string, createdAt: Date, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const res = await RequestsModel.find({ orgUniqName, createdAt, deleted: false }).skip(skip).limit(limit).lean();
        return res;
    }

    /*
    * Function to add new wfh request
    */
    public static async addRequest(obj: AddRequest): Promise<boolean> {
        await RequestsModel.create({ orgUniqName: obj.orgUniqName, userEmail: obj.userEmail, requestStatus: obj.requestStatus, rejectionReason: obj.rejectionReason, wfhReason: obj.wfhReason, deleted: false, createdAt: obj.createdAt, availedAt: obj.availedAt });
        return true;
    }

    /*
    * Function to update request by org uniq name, user email, availed at and request status
    */
    public static async updateRequestByOrgUniqNameAndUserEmailAndAvailedAtAndRequestStatus(obj: UpdateRequest): Promise<boolean> {
        const approvalAt = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0);
        const res = await RequestsModel.updateOne({ orgUniqName: obj.orgUniqName, userEmail: obj.userEmail, availedAt: obj.availedAt, requestStatus: obj.oldRequestStatus, deleted: false }, { $set: { rejectionReason: obj.rejectionReason, approvalAt, requestStatus: obj.requestStatus } })
        if (res.modifiedCount === 1) return true;
        return false;
    }

    /*
    * Function to updat org unique name
    */
    public static async updateOrgUniqname(oldOrgUniqName: string, orgUniqName: string): Promise<boolean> {
        const res = await RequestsModel.updateMany({ orgUniqName: oldOrgUniqName, deleted: false }, { $set: { orgUniqName } });
        if (res.modifiedCount > 0) return true;
        return false;
    }

    /*
    * Function to delive request by org unique name
    */
    public static async deliveRequestsByOrgUniqueName(orgUniqName: string): Promise<boolean> {
        await RequestsModel.updateMany({ orgUniqName: orgUniqName, deleted: false }, { $set: { deleted: true } });
        return true;
    }
}
