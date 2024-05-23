import { AddOrganisation, EditOrganisation, OrganisationRow } from "../typings/orgnisationTypings";
import { OrganisationModel } from "../models/organisationModel";
import { UserModel } from "../models/usersModel";

export class OrganisationDao{
    public static async getOrganisationByOrgUniqName(orgUniqName:string):Promise<OrganisationRow|boolean>{
        try{
                // console.log("dao",orgUniqName);
                const res:OrganisationRow= await OrganisationModel.findOne({orgUniqName,deleted:false});
                return res;
        }catch(e){return false}
           
    }

    public static async getOrganisationByOrgUniqNameAndUserEmail(orgUniqName:string):Promise<OrganisationRow|boolean>{
        try{
            const res:OrganisationRow= await OrganisationModel.findOne({orgUniqName,deleted:false});
            return res;
        }catch(e){return false}
    }

    public static async getOrganisationsList(page:number,limit:number){
        const skip=(page-1)*limit
        const res= await OrganisationModel.find({deleted:false}).skip(skip).limit(limit);
        return res;
    }

    public static async getOrganisationListCount():Promise<number>{
        const totalRecords=await OrganisationModel.countDocuments({deleted:false})
        return totalRecords;
    }

    public static async getOrganisationDataCount(orgUniqName:string):Promise<number>{
        const totalRecords=await UserModel.countDocuments({orgUniqName:orgUniqName,deleted:false})
        return totalRecords;
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
            await  OrganisationModel.updateOne({orgUniqName:obj.oldOrgUniqName,deleted:false},{$set:{orgUniqName:obj.orgUniqName,orgDisplayName:obj.orgDisplayName,orgAdmin:obj.orgAdmin,maxWfh:obj.maxWfh}});
        //     if(res.modifiedCount===1)return true;
            return true;
    }

    public static async editOrganisationAdminbyOrgUniqName(orgUniqName:string,orgNewAdmin:string):Promise<boolean>{
            await  OrganisationModel.updateOne({orgUniqName:orgUniqName,deleted:false},{$set:{orgAdmin:orgNewAdmin}});
        //     if(res.modifiedCount===1)return true;
            return true;
    }
    
    public static async deleteOrganisationByOrgUniqNameAndSystemUser(orgUniqName:string):Promise<boolean>{
            const res= await OrganisationModel.updateOne({orgUniqName:orgUniqName,deleted:false},{$set:{deleted:true}});
            if(res.modifiedCount===1)return true;
            return false;
    }
}