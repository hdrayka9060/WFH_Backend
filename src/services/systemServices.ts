import { OrganisationDao } from '../dao/organisationDao';
import { UserDao } from '../dao/userDao';

export class SystemServices{
    public static async getOrganisationList(systemUser:string){
        try{
            const res=await OrganisationDao.getOrganisatioBySystemUser(systemUser);
            if(!res){return {success:false};}
            let orgUniqName=[];
            let orgDisplayName=[];
            let orgAdmin=[];
            let maxWfh=[];

            for(let i=0;i<res.length;i++){
                orgUniqName.push(res[i].orgUniqName);
                orgDisplayName.push(res[i].orgDisplayName);
                orgAdmin.push(res[i].orgAdmin);
                maxWfh.push(res[i].maxWfh);
            }

            return {success:true,orgUniqName,orgDisplayName,orgAdmin,maxWfh};
        }catch(e){return {success:false};}
    }

    public static async getOrganisationData (orgUniqName:string){
        try{
            const res=await UserDao.getUserByOrgUniqName(orgUniqName);
            if(!res){return {success:false};}
            let userId=[];
            let userEmail=[]
            let firstName=[];
            let lastName=[];
            let wfh=[];
            let dateOfJoiningDay=[];
            let dateOfJoiningMonth=[];
            let dateOfJoiningYear=[];

            for(let i=0;i<res.length;i++){
                userId.push(res[i].userId);
                userEmail.push(res[i].userEmail);
                firstName.push(res[i].firstName);
                lastName.push(res[i].lastName);
                wfh.push(res[i].wfh);
                dateOfJoiningDay.push(res[i].dateOfJoiningDay);
                dateOfJoiningMonth.push(res[i].dateOfJoiningMonth);
                dateOfJoiningYear.push(res[i].dateOfJoiningYear);
            }
            
            return {success:true,userId,userEmail,firstName,lastName,wfh,dateOfJoiningDay,dateOfJoiningMonth,dateOfJoiningYear};
        }catch(e){return {success:false};}
    }

    public static async createOrganisationService(orgUniqName:string, orgDisplayName:string, orgAdmin:string, maxWfh:number, systemUser:string){
        try{
            const org=await OrganisationDao.getOrganisationByOrgUniqName(orgUniqName);
            if(org){
                return {success:false}
            }

            const res=await OrganisationDao.addOrganisation(orgUniqName, orgDisplayName, orgAdmin, maxWfh, systemUser);
            if(!res){return {success:false};}
            return {success:true};
        }catch(e){return {success:false};}
    }

    public static async editOrganisationService(oldOrgUniqName:string,orgUniqName:string, orgDisplayName:string, orgAdmin:string, maxWfh:number, systemUser:string){
        try{
            const org=await OrganisationDao.getOrganisationByOrgUniqName(orgUniqName);
            if(org){
                return {success:false}
            }

            const res=await OrganisationDao.editOrganisationbyOrgUniqNameAnsSystemUser(oldOrgUniqName, orgUniqName, orgDisplayName, orgAdmin, maxWfh, systemUser);
            if(!res){return {success:false};}
            return {success:true};
        }catch(e){return {success:false};}
    }

    public static async deleteOrganisationService(orgUniqName:string, systemUser:string){
        try{
            const res=await OrganisationDao.deleteOrganisationByOrgUniqNameAndSystemUser(orgUniqName, systemUser);
            if(!res){return {success:false};}
            return {success:true};
        }catch(e){return {success:false};}
    }

    public static async addUserService(
        userId:string,   userEmail:string,    orgUniqName:string,    firstName:string,    lastName:string,
        dateOfBirthDay:number,      dateOfBirthMonth:number,    dateOfBirthYear:number,
        dateOfJoiningDay:number,    dateOfJoiningMonth:number,  dateOfJoiningYear:number
    ){
        try{

            const user=await UserDao.getUserByOrgUniqNameAndUserEmail(orgUniqName,userEmail);
            if(user){
                return {success:false}
            }

            const res= await UserDao.addUser(userId,userEmail,orgUniqName,firstName,lastName,dateOfBirthDay,dateOfBirthMonth,dateOfBirthYear,dateOfJoiningDay,dateOfJoiningMonth,dateOfJoiningYear);
            if(!res){return {success:false};}
            return {success:true};
        }catch(e){return {success:false};}
    }

    public static async removeUserService(userEmail:string,orgUniqName:string){
        try{
            const res= await UserDao.deleteUser(userEmail,orgUniqName);
            if(!res){return {success:false};}
            return {success:true};
        }catch(e){return {success:false};}
    }    
}
