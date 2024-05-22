import { Request, Response } from "express";
import { SystemServices } from '../services/systemServices';

export class SystemController {

    public static async organisationList(req: Request, res: Response):Promise<Response> {
        try {
            const result = await SystemServices.getOrganisationList();
            return res.send({ status: 200, data: result, message: "Success" });
        }
        catch (err) {
            console.log('err', err)
            return res.send({ status: 400, data: [], message: "Something went wrong" });
        }
    }

    public static async organisationData(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName } = req.body;
            const result = await SystemServices.getOrganisationData(organisationUniqueName);
            return res.send({ status: 200, data: result, message: "Success" });
        }
        catch (err) {
            return res.send({ status: 400, data: [], message: "Something went wrong" });
        }
    }

    public static async createOrganisation(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName, organisationDisplayName, organisationMaxWfh } = req.body;
            const obj = { orgUniqName: organisationUniqueName, orgDisplayName: organisationDisplayName, maxWfh: organisationMaxWfh }
            const result = await SystemServices.createOrganisationService(obj);
            if (result) return res.send({ status: 200, message: "Organisation Created" });
            else return res.send({ status: 400, message: "Organisation Already Present" });
        }
        catch (err) {
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    public static async editOrganisation(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName, organisationNewUniqueName, organisationNewDisplayName, organisationNewAdmin, organisationNewMaxWfh } = req.body
            const obj = { oldOrgUniqName: organisationUniqueName, orgUniqName: organisationNewUniqueName, orgDisplayName: organisationNewDisplayName, orgAdmin: organisationNewAdmin, maxWfh: organisationNewMaxWfh }
            const result = await SystemServices.editOrganisationService(obj);
            if (result) return res.send({ status: 200, message: "Organisation Edited" });
            else return res.send({ status: 400, message: "Please check youe credentials" });
        }
        catch (err) {
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    public static async deleteOrganisation(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName } = req.body;
            console.log(organisationUniqueName)
            const result = await SystemServices.deleteOrganisationService(organisationUniqueName);
            if (result) return res.send({ status: 200, message: "Deleted succesfully" });
            else return res.send({ status: 400, message: "Failed to Delete" });
        }
        catch (err) {
            console.log("err", err);
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    public static async addUser(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName, organisationUserEmail, firstName, lastName, dateOfBirth } = req.body;
            const obj = { orgUniqName: organisationUniqueName, userEmail: organisationUserEmail, firstName, lastName, dateOfBirth }
            const result = await SystemServices.addUserService(obj);
            if (result) return res.send({ status: 200, message: "User Added" });
            else return res.send({ status: 400, message: "User Already present" });
        }
        catch (err) {
            console.log("Error", err);
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    public static async editUser(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUserOldEmail, organisationUniqueName, organisationUserEmail, firstName, lastName, dateOfBirth } = req.body;
            const obj = { userOldEmail: organisationUserOldEmail, orgUniqName: organisationUniqueName, userEmail: organisationUserEmail, firstName, lastName, dateOfBirth }
            const result = await SystemServices.editUserService(obj);
            if (result) return res.send({ status: 200, message: "User Edited" });
            else return res.send({ status: 400, message: "User Already present" });
        }
        catch (err) {
            console.log("Error", err);
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }

    public static async removeUser(req: Request, res: Response):Promise<Response> {
        try {
            const { organisationUniqueName, organisationUserEmail } = req.body;
            const result = await SystemServices.removeUserService(organisationUserEmail, organisationUniqueName);
            if (result) return res.send({ status: 200, message: "Deleted succesfully" });
            else return res.send({ status: 400, message: "Failed to Delete" });
        }
        catch (err) {
            console.log("err", err);
            return res.send({ status: 400, message: "Something went wrong" });
        }
    }
}