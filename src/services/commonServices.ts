import { UserDao } from '../dao/userDao';
import { RequestsDao } from '../dao/requestsDao';
import { OrganisationDao } from '../dao/organisationDao';
import { RequestWfh,CalenderData } from '../typings/commonTypings';
import { UserRow } from '../typings/userTypings';
import { OrganisationRow } from '../typings/orgnisationTypings';
import { RequestsRow } from 'typings/requestsTypings';

export class CommonServices{
    public static async requestWfhService (obj:RequestWfh):Promise<boolean>{
        try{
            const res=await RequestsDao.addRequest(obj);
            const user=await UserDao.getUserByOrgUniqNameAndUserEmail(obj.orgUniqName,obj.userEmail);
            if(typeof res==='boolean'||typeof user==='boolean'){return false }
            const wfh=await UserDao.updateUserWfh({userEmail:obj.userEmail,orgUniqName:obj.orgUniqName,wfh:user['wfh']+1});
            if(!wfh)return false;
            return true;        
        }catch(e){return false;}
    }

    public static async userWfhService (orgUniqName:string, userEmail:string):Promise<{wfh:number,maxWfh:number}|boolean>{
        try{
            const user:UserRow|boolean=await UserDao.getUserByOrgUniqNameAndUserEmail(orgUniqName,userEmail);
            const org:OrganisationRow|boolean=await OrganisationDao.getOrganisationByOrgUniqName(orgUniqName);
            if(typeof user==='boolean' || typeof org==='boolean'){return false;}
            return {wfh:user['wfh'],maxWfh:org['maxWfh']}       
        }catch(e){return false;}
    }

    public static async getCalenderData(orgUniqName:string,userEmail:string):Promise<{result:CalenderData[],wfh:number,maxWfh:number}|boolean>{
        try{
            const res:RequestsRow[]|boolean=await RequestsDao.getRequestsByOrgUniqNameAndUserEmail(orgUniqName,userEmail);
            const user:UserRow|boolean=await UserDao.getUserByOrgUniqNameAndUserEmail(orgUniqName,userEmail);
            const org:OrganisationRow|boolean=await OrganisationDao.getOrganisationByOrgUniqName(orgUniqName);

            if(typeof res==='boolean'||typeof user==='boolean'||typeof org==='boolean'){return false;}

            const wfh=user['wfh'];
            const maxWfh=org['maxWfh'];
            
            let result=[];
            for(let i=0;i<res.length;i++){
                result.push({requestStatus:res[i]['requestStatus'],rejectionReason:res[i]['rejectionReason'],wfhReason:res[i]['wfhReason'],approvalAt:res[i]['approvalAt'],createdAt:res[i]['createdAt'],availedAt:res[i]['availedAt']})
            }
            return {result:result,wfh:wfh,maxWfh:maxWfh};
        }catch(e){return false;}
    }    
}
