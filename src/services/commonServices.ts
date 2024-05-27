import { UserDao } from '../dao/userDao';
import { RequestsDao } from '../dao/requestsDao';
import { OrganisationDao } from '../dao/organisationDao';
import { RequestWfh,CalenderData } from '../typings/commonTypings';
import { UserRow } from '../typings/userTypings';
import { OrganisationRow } from '../typings/orgnisationTypings';
import { RequestsRow } from '../typings/requestsTypings';

export class CommonServices{
    /*
    * Function to add new wfh request
    */
    public static async addWfhRequest (obj:RequestWfh):Promise<boolean>{
        try{
            const res=await RequestsDao.addRequest(obj);
            return true;        
        }catch(e){return false;}
    }

    /*
    * Function to get users wfh count
    */
    public static async getUsersWfh (orgUniqName:string, userEmail:string):Promise<{wfh:number,maxWfh:number}|boolean>{
        try{
            const user:UserRow|boolean=await UserDao.getUserByOrgUniqNameAndUserEmail(orgUniqName,userEmail);
            const org:OrganisationRow|boolean=await OrganisationDao.getOrganisationByOrgUniqName(orgUniqName);
            if(typeof user==='boolean' || typeof org==='boolean'){return false;}
            return {wfh:user['wfh'],maxWfh:org['maxWfh']}       
        }catch(e){return false;}
    }

    /*
    * Function to get users past wfh request
    */
    public static async getWfhRequestsData(orgUniqName:string,userEmail:string,year:number,month:number):Promise<{result:CalenderData[],maxWfh:number}|boolean>{
        try{
            const res:RequestsRow[]|boolean=await RequestsDao.getRequestsByOrgUniqNameAndUserEmailAndDates(orgUniqName,userEmail,year,month);
            const org:OrganisationRow|boolean=await OrganisationDao.getOrganisationByOrgUniqName(orgUniqName);

            if(typeof res==='boolean'||typeof org==='boolean'){return false;}

            const maxWfh=org['maxWfh'];
            
            let result=[];
            for(let i=0;i<res.length;i++){
                result.push({requestStatus:res[i]['requestStatus'],rejectionReason:res[i]['rejectionReason'],wfhReason:res[i]['wfhReason'],approvalAt:res[i]['approvalAt'],createdAt:res[i]['createdAt'],availedAt:res[i]['availedAt']})
            }
            return {result:result,maxWfh:maxWfh};
        }catch(e){return false;}
    }    
}
