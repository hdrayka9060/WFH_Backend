import { AddOrganisation, EditOrganisation, OrganisationRow } from "../typings/orgnisationTypings";
import { OrganisationModel } from "../models/organisationModel";

export class OrganisationDao{
    public static async getOrganisationByOrgUniqName(orgUniqName:string):Promise<OrganisationRow>{
            const res:OrganisationRow= await OrganisationModel.findOne({orgUniqName,deleted:false});
            return res;
    }

    public static async getOrganisationByOrgUniqNameAndUserEmail(orgUniqName:string):Promise<OrganisationRow>{
            const res:OrganisationRow= await OrganisationModel.findOne({orgUniqName,deleted:false});
            return res;
    }

    public static async getOrganisations():Promise<OrganisationRow[]>{
            const res:OrganisationRow[]= await OrganisationModel.find({deleted:false});
            return res;
    }
    
    public static async addOrganisation(obj:AddOrganisation):Promise<boolean>{
            await OrganisationModel.create({orgUniqName:obj.orgUniqName,orgDisplayName:obj.orgDisplayName,maxWfh:obj.maxWfh,deleted:false});
            return true;
    }
    
    public static async editOrganisationbyOrgUniqName(obj:EditOrganisation):Promise<boolean>{
            const res= await  OrganisationModel.updateOne({orgUniqName:obj.oldOrgUniqName,deleted:false},{$set:{orgUniqName:obj.orgUniqName,orgDisplayName:obj.orgDisplayName,orgAdmin:obj.orgAdmin,maxWfh:obj.maxWfh}});
            if(res.modifiedCount===1)return true;
            return false;
    }

    public static async editOrganisationAdminbyOrgUniqName(orgUniqName:string,orgNewAdmin:string):Promise<boolean>{
            const res= await  OrganisationModel.updateOne({orgUniqName:orgUniqName,deleted:false},{$set:{orgAdmin:orgNewAdmin}});
            if(res.modifiedCount===1)return true;
            return false;
    }
    
    public static async deleteOrganisationByOrgUniqNameAndSystemUser(orgUniqName:string):Promise<boolean>{
            const res= await OrganisationModel.updateOne({orgUniqName:orgUniqName,deleted:false},{$set:{deleted:true}});
            if(res.modifiedCount===1)return true;
            return false;
    }
}