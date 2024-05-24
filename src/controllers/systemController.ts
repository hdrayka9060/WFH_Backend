import { Request, Response } from "express";
import { SystemServices } from '../services/systemServices';
import { AddUserRequest, CreateOrganisationRequest, DeliveOrganisationRequest, EditOrganisationRequest, EditUserRequest, GetOrganisationDataRequest, GetOrganisationListRequest, GetOrganisationUsersRequest, RemoveUserRequest } from "../typings/system.types";

export class SystemController {

    /*
    * Function to get all organisations
    */
    public static async getOrganisationList(req: Request<{},{},GetOrganisationListRequest>, res: Response):Promise<Response> {
        try {
            const {page,limit}=req.body;
            const result = await SystemServices.getOrganisations(page,limit);
            const totalRecords=await SystemServices.getOrganisationsCount();
            return res.send({ status: 200, data: result, message: "Success",totalRecords:totalRecords});
        }
        catch (err) {
            console.log('organisationList err', err)
            return res.send({ status: 400, data: [], message: "Something went wrong",totalRecords:0 });
        }
    }

    /*
    * Function to get particular organisations data
    */
    public static async getOrganisationData(req: Request<{},{},GetOrganisationDataRequest>, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName,page,limit } = req.body;
            const result = await SystemServices.getOrganisationData(organisationUniqueName,page,limit);
            const totalRecords=await SystemServices.getOrganisationDataCount(organisationUniqueName);
            return res.send({ status: 200, data: result, message: "Success",totalRecords:totalRecords });
        }
        catch (err) {
            console.log('organisationData err', err)
            return res.send({ status: 400, data: [], message: "Something went wrong",totalRecords:0 });
        }
    }

    /*
    * Function to get particular organisations users
    */
    public static async getOrganisationUsers(req: Request<{},{},GetOrganisationUsersRequest>, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName } = req.body;
            const result = await SystemServices.getOrganisationUsers(organisationUniqueName);
            return res.send({ status: 200, data: result, message: "Success" });
        }
        catch (err) {
            console.log('organisationUsers err', err)
            return res.send({ status: 400, data: [], message: "Something went wrong" });
        }
    }

    /*
    * Function to create new organisation
    */
    public static async createOrganisation(req: Request<{},{},CreateOrganisationRequest>, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName, organisationDisplayName, organisationMaxWfh } = req.body;
            const obj = { orgUniqName: organisationUniqueName, orgDisplayName: organisationDisplayName, maxWfh: organisationMaxWfh }
            const result = await SystemServices.createOrganisationService(obj);
            if (result) return res.send({ status: 200, message: "Organisation Created" });
            else return res.send({ status: 400, message: "Organisation Already Present" });
        }
        catch (err) {
            console.log('createOrganisation err', err)
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    /*
    * Function to edit organisation
    */
    public static async editOrganisation(req: Request<{},{},EditOrganisationRequest>, res: Response):Promise<Response> {
        try {
            
            const { organisationUniqueName, organisationNewUniqueName, organisationNewDisplayName, organisationNewAdmin, organisationNewMaxWfh } = req.body
            const obj = { oldOrgUniqName: organisationUniqueName, orgUniqName: organisationNewUniqueName, orgDisplayName: organisationNewDisplayName, orgAdmin: organisationNewAdmin, maxWfh: organisationNewMaxWfh }
            const result = await SystemServices.editOrganisationService(obj);
            if (result) return res.send({ status: 200, message: "Organisation Edited" });
            else return res.send({ status: 400, message: "Credentials Invalid" });
        }
        catch (err) {
            console.log('editOrganisation err', err)
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    /*
    * Function to delive organisation
    */
    public static async deliveOrganisation(req: Request<{},{},DeliveOrganisationRequest>, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName } = req.body;
            const result = await SystemServices.deliveOrganisationService(organisationUniqueName);
            if (result) return res.send({ status: 200, message: "Deleted succesfully" });
            else return res.send({ status: 400, message: "Failed to Delete" });
        }
        catch (err) {
            console.log("deleteOrganisation err", err);
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    /*
    * Function to add user in organiation
    */
    public static async addUser(req: Request<{},{},AddUserRequest>, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName, organisationUserEmail, firstName, lastName, dateOfBirth } = req.body;
            const obj = { orgUniqName: organisationUniqueName, userEmail: organisationUserEmail, firstName, lastName, dateOfBirth }
            const result = await SystemServices.addUserService(obj);
            if (result) return res.send({ status: 200, message: "User Added" });
            else return res.send({ status: 400, message: "User Already present" });
        }
        catch (err) {
            console.log("addUser err", err);
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    /*
    * Function to edit user details
    */
    public static async editUser(req: Request<{},{},EditUserRequest>, res: Response):Promise<Response> {
        try {
            const { organisationUserOldEmail, organisationUniqueName, organisationUserEmail, firstName, lastName, dateOfBirth } = req.body;
            const obj = { userOldEmail: organisationUserOldEmail, orgUniqName: organisationUniqueName, userEmail: organisationUserEmail, firstName, lastName, dateOfBirth }
            const result = await SystemServices.editUserService(obj);
            if (result) return res.send({ status: 200, message: "User Edited" });
            else return res.send({ status: 400, message: "User Already present" });
        }
        catch (err) {
            console.log("editUser err", err);
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    /*
    * Function to delive user
    */
    public static async removeUser(req: Request<{},{},RemoveUserRequest>, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName, organisationUserEmail } = req.body;
            const result = await SystemServices.removeUserService(organisationUserEmail, organisationUniqueName);
            if (result) return res.send({ status: 200, message: "Deleted succesfully" });
            else return res.send({ status: 400, message: "Failed to Delete" });
        }
        catch (err) {
            console.log("removeUser err", err);
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }
}