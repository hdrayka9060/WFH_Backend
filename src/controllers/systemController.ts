import {Request,Response} from "express";
import { SystemServices } from '../services/systemServices';

export class SystemController{
    public static async organisationList (req:Request,res:Response){
        try{
            const {email}=req.body;
            const result=await SystemServices.getOrganisationList(email);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async organisationData (req:Request,res:Response){
        try{
            const {orgUniqName}=req.body;
            const result=await SystemServices.getOrganisationData(orgUniqName);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async createOrganisation (req:Request,res:Response){
        try{
            let {orgUniqName, orgDisplayName, orgAdmin, maxWfh, email}=req.body;
            maxWfh=Number(maxWfh);
            const result=await SystemServices.createOrganisationService(orgUniqName, orgDisplayName, orgAdmin, maxWfh, email);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async editOrganisation (req:Request,res:Response){
        try{
            let {oldOrgUniqName, orgUniqName, orgDisplayName, orgAdmin, maxWfh, email}=req.body;
            maxWfh=Number(maxWfh);
            const result=await SystemServices.editOrganisationService(oldOrgUniqName, orgUniqName, orgDisplayName, orgAdmin, maxWfh, email);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async deleteOrganisation (req:Request,res:Response){
        try{
            const {orgUniqName,email}=req.body;
            const result=await SystemServices.deleteOrganisationService(orgUniqName,email);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async addUser (req:Request,res:Response){
        try{
            let {userId,userEmail,orgUniqName,firstName,lastName,dateOfBirthDay,dateOfBirthMonth,dateOfBirthYear,dateOfJoiningDay,dateOfJoiningMonth,dateOfJoiningYear}=req.body;
            dateOfBirthDay=Number(dateOfBirthDay);
            dateOfBirthMonth=Number(dateOfBirthMonth);
            dateOfBirthYear=Number(dateOfBirthYear);
            dateOfJoiningDay=Number(dateOfJoiningDay);
            dateOfJoiningMonth=Number(dateOfJoiningMonth);
            dateOfJoiningYear=Number(dateOfJoiningYear);
            const result=await SystemServices.addUserService(userId,userEmail,orgUniqName,firstName,lastName,dateOfBirthDay,dateOfBirthMonth,dateOfBirthYear,dateOfJoiningDay,dateOfJoiningMonth,dateOfJoiningYear);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }

    public static async removeUser (req:Request,res:Response){
        try{
            const {userEmail,orgUniqName}=req.body;
            const result=await SystemServices.removeUserService(userEmail,orgUniqName);
            res.send(result);
        }
        catch(err){
            res.send({success:false});
        }
    }
}