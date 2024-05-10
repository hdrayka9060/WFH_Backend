import { RequestsDao } from '../dao/requestsDao';
import {UserDao } from '../dao/userDao'

export class AdminServices{
    public static async getRequestList (orgUniqName:string){
        try{
            const requestStatus='pending';
            const res=await RequestsDao.getRequestsByOrgUniqNameAndRequestStatus(orgUniqName,requestStatus);
            if(!res){return {success:false};}
            let userId=[];
            let userEmail=[];
            let firstName=[];
            let lastName=[];
            let availedAtDay=[];
            let availedAtMonth=[];
            let availedAtYear=[];
            let wfh=[];

            for(let i=0;i<res.length;i++){
                userEmail.push(res[i].userEmail);
                availedAtDay.push(res[i].approvalAtDay);
                availedAtMonth.push(res[i].approvalAtMonth);
                availedAtYear.push(res[i].approvalAtYear);
            }

            for(let i=0;i<userEmail.length;i++){
                const user=await UserDao.getUserByOrgUniqNameAndUserEmail(orgUniqName,userEmail[i]);
                userId.push(user.userId);
                firstName.push(user.firstName);
                lastName.push(user.lastName);
                wfh.push(user.wfh);
            }

            return {success:true,userId,userEmail,firstName,lastName,availedAtDay,availedAtMonth,availedAtYear,wfh};
        }catch(e){return {success:false};}
    }

    public static async updateRequestService(
        orgUniqName:string,     userEmail:string,        requestStatus:string,   
        availedAtDay:number,    availedAtMonth:number,   availedAtYear:number,
        rejectionReason:string, oldRequestStatus:string
    ){
        try{
            const res=await RequestsDao.updateRequestByOrgUniqNameAndUserEmailAndUserAndAvailedAtAndRequestStatus(orgUniqName,userEmail,requestStatus,availedAtDay,availedAtMonth,availedAtYear,rejectionReason,oldRequestStatus);
            if(!res){return {success:false};}
            return {success:true}
        }catch(e){return {success:false};}
    }
}
