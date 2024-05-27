import { GetFilterRequestList, GetRequestList, UpdateRequestService } from '../typings/adminTypings';
import { RequestsDao } from '../dao/requestsDao';
import {UserDao } from '../dao/userDao'
import { UserRow } from '../typings/userTypings';
import { OrganisationDao } from '../dao/organisationDao';

export class AdminServices{
    public static async getRequestList (orgUniqName:string,page:number,limit:number):Promise<GetRequestList[]>{
        try{
            const requestStatus='Pending';
            const res=await RequestsDao.getRequestsByOrgUniqNameAndRequestStatus(orgUniqName,requestStatus,page,limit);
            if(!res){return [];}

            let result:GetRequestList[]=[];
            if(typeof res==='boolean')return result;
            for(let i=0;i<res.length;i++){
                const user:UserRow|boolean=await UserDao.getUserByOrgUniqNameAndUserEmail(orgUniqName,res[i]['userEmail']);
                if(typeof user!=='boolean')result.push({'id':(page-1)*limit+i+1,'name':user['firstName']+" "+user['lastName'],'userEmail':res[i]['userEmail'],'wfhReason':res[i]['wfhReason'],'wfh':user['wfh'],'availedAt':res[i]['availedAt'],'createdAt':res[i]['createdAt'],'requestStatus':res[i]['requestStatus']});
            }
            return result;
        }catch(e){console.log("req list err",e);return [];}
    }

    public static async getUserWfh(userEmail:string,orgUniqName:string){
        const user=await UserDao.getUserByOrgUniqNameAndUserEmail(orgUniqName,userEmail);
        const org=await OrganisationDao.getOrganisationByOrgUniqName(orgUniqName);

        if(typeof user==='boolean'||typeof org==='boolean'){return {wfh:0,maxWfh:0};}
        const wfh=user['wfh'];
        const maxWfh=org['maxWfh'];
        return {wfh:wfh,maxWfh:maxWfh};
    }

    public static async getRequestListCount(orgUniqName:string):Promise<number>{
        try{
            const totalRecords=await RequestsDao.getOrganisationsCount(orgUniqName);
            return totalRecords;
        }catch(e){return 0;}
    }

    public static async getUsersList (orgUniqName:string):Promise<string[]>{
        try{
            const res= await UserDao.getUserByOrgUniqName(orgUniqName);
            let result=[];
            for(let i=0;i<res.length;i++)result.push(res[i]['userEmail']);

            return result;
        }catch(e){console.log("req list err",e);return [];}
    }

    public static async getFilterRequestList (obj:GetFilterRequestList):Promise<GetRequestList[]>{
        try{
            let res;
            if(obj.filterType==='Request Status')res=await RequestsDao.getRequestsByOrgUniqNameAndRequestStatus(obj.orgUniqName,obj.requestStatus,obj.page,obj.limit);
            else if (obj.filterType==='Availed By')res=await RequestsDao.getSkipedRequestsByOrgUniqNameAndUserEmail(obj.orgUniqName,obj.user,obj.page,obj.limit);
            else if(obj.filterType==='Availed At')res=await RequestsDao.getRequestsByOrgUniqNameAndAvailedAt(obj.orgUniqName,obj.date,obj.page,obj.limit);
            else res=await RequestsDao.getRequestsByOrgUniqNameAndCreatedAt(obj.orgUniqName,obj.date,obj.page,obj.limit);
            if(!res){return [];}
            let result:GetRequestList[]=[];
            if(typeof res==='boolean')return result;
            for(let i=0;i<res.length;i++){
                const user:UserRow|boolean=await UserDao.getUserByOrgUniqNameAndUserEmail(obj.orgUniqName,res[i]['userEmail']);
                if(typeof user!=='boolean')result.push({'id':i+1,'name':user['firstName']+" "+user['lastName'],'userEmail':res[i]['userEmail'],'wfhReason':res[i]['wfhReason'],'wfh':user['wfh'],'availedAt':res[i]['availedAt'],'createdAt':res[i]['createdAt'],'requestStatus':res[i]['requestStatus']});
            }
            return result;
        }catch(e){console.log("filter req list err",e);return [];}
    }

    public static async updateRequestService(obj:UpdateRequestService):Promise<boolean>{
        try{
            const user=await UserDao.getUserByOrgUniqNameAndUserEmail(obj.orgUniqName,obj.userEmail);
            if(typeof user==='boolean'){return false }
            const res=await RequestsDao.updateRequestByOrgUniqNameAndUserEmailAndAvailedAtAndRequestStatus(obj);
            if(!res){return false;}
            if(obj.requestStatus==='Approved'){
                const wfh=await UserDao.updateUserWfh({userEmail:obj.userEmail,orgUniqName:obj.orgUniqName,wfh:user['wfh']+1});
                if(!wfh)return false;
            }
            return true;
        }catch(e){return false;}
    }
}
