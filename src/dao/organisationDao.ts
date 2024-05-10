import { OrganisationModel } from "../models/organisationModel";

export class OrganisationDao{
    public static async getOrganisationByOrgUniqName(orgUniqName:string){
        try{
            return await OrganisationModel.findOne({orgUniqName,deleted:false}).orFail() ;
        }catch(e){return null;}
    }

    public static async getOrganisatioBySystemUser(systemUser:string){
        try{
            return await OrganisationModel.find({systemUser,deleted:false}).orFail() ;
        }catch(e){return null;}
    }
    
    public static async addOrganisation(
        orgUniqName:string, 
        orgDisplayName:string, 
        orgAdmin:string, 
        maxWfh:number, 
        systemUser:string
    ){
        try{
            return await OrganisationModel.insertMany([{orgUniqName,orgDisplayName,orgAdmin,maxWfh,systemUser,deleted:false}]);
        }catch(e){return null;}
    }
    
    public static async editOrganisationbyOrgUniqNameAnsSystemUser(
        oldOrgUniqName:string, 
        orgUniqName:string, 
        orgDisplayName:string, 
        orgAdmin:string, 
        maxWfh:number, 
        systemUser:string,
    ){
        try{
            return await OrganisationModel.updateOne({systemUser,oldOrgUniqName,deleted:false},{$set:{orgUniqName,orgDisplayName,orgAdmin,maxWfh,systemUser}});
        }catch(e){return null;}
    }
    
    public static async deleteOrganisationByOrgUniqNameAndSystemUser(orgUniqName:string,systemUser:string){
        try{
            return await OrganisationModel.updateOne({systemUser,orgUniqName,deleted:false},{$set:{deleted:true}});
        }catch(e){return null;}
    }
}



