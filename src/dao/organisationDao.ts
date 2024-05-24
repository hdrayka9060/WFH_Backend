import { AddOrganisation, EditOrganisation, OrganisationRow } from "../typings/orgnisationTypings";
import { OrganisationModel } from "../models/organisationModel";
import { UserModel } from "../models/usersModel";

export class OrganisationDao{
    /*
    * Function to get organisations by Org Unique Name
    */
    public static async getOrganisationByOrgUniqName(orgUniqName:string):Promise<OrganisationRow|boolean>{
        try{
                const res:OrganisationRow= await OrganisationModel.findOne({orgUniqName,deleted:false}).lean();
                return res;
        }catch(e){return false}
           
    }

    /*
    * Function to get organisation by Org Unique Name and User Email
    */
    public static async getOrganisationByOrgUniqNameAndUserEmail(orgUniqName:string):Promise<OrganisationRow|boolean>{
        try{
            const res:OrganisationRow= await OrganisationModel.findOne({orgUniqName,deleted:false}).lean();
            return res;
        }catch(e){return false}
    }

    /*
    * Function to get organisations
    */
    public static async getOrganisations(page:number,limit:number){
        const skip=(page-1)*limit
        const res= await OrganisationModel.find({deleted:false}).skip(skip).limit(limit).lean();
        return res;
    }

    /*
    * Function to get organisations count
    */
    public static async getOrganisationsCount():Promise<number>{
        const totalRecords=await OrganisationModel.countDocuments({deleted:false})
        return totalRecords;
    }

    /*
    * Function to get organisations data count
    */
    public static async getOrganisationDataCount(orgUniqName:string):Promise<number>{
        const totalRecords=await UserModel.countDocuments({orgUniqName:orgUniqName,deleted:false})
        return totalRecords;
    }

    /*
    * Function to get organisations unique name
    */
    public static async getOrganisationsUniqueName():Promise<OrganisationRow[]>{
            const res:OrganisationRow[]= await OrganisationModel.find({deleted:false}).lean();
            return res;
    }
    
    /*
    * Function to create new organisation
    */
    public static async createOrganisation(obj:AddOrganisation):Promise<boolean>{
            await OrganisationModel.create({orgUniqName:obj.orgUniqName,orgDisplayName:obj.orgDisplayName,maxWfh:obj.maxWfh,deleted:false});
            return true;
    }
    
    /*
    * Function to edit organisation by org unique name
    */
    public static async editOrganisationByOrgUniqName(obj:EditOrganisation):Promise<boolean>{
            await  OrganisationModel.updateOne({orgUniqName:obj.oldOrgUniqName,deleted:false},{$set:{orgUniqName:obj.orgUniqName,orgDisplayName:obj.orgDisplayName,orgAdmin:obj.orgAdmin,maxWfh:obj.maxWfh}});
        //     if(res.modifiedCount===1)return true;
            return true;
    }

    /*
    * Function to edit organisation admin by org unique name
    */
    public static async editOrganisationAdminByOrgUniqName(orgUniqName:string,orgNewAdmin:string):Promise<boolean>{
            await  OrganisationModel.updateOne({orgUniqName:orgUniqName,deleted:false},{$set:{orgAdmin:orgNewAdmin}});
        //     if(res.modifiedCount===1)return true;
            return true;
    }
    
    /*
    * Function to delive organisation by org unique name
    */
    public static async deliveOrganisationByOrgUniqNameAndSystemUser(orgUniqName:string):Promise<boolean>{
            const res= await OrganisationModel.updateOne({orgUniqName:orgUniqName,deleted:false},{$set:{deleted:true}});
            if(res.modifiedCount===1)return true;
            return false;
    }
}