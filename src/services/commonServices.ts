import { RequestsDao } from '../dao/requestsDao';

export class CommonServices{
    public static async requestWfhService (
        orgUniqName:string,    userEmail:string,       rejectionReason:string, wfhReason:string,  requestStatus:string,  
        availedAtDay:number,   availedAtMonth:number,  availedAtYear:number, 
        approvalAtDay:number,  approvalAtMonth:number, approvalAtYear:number, 
        createdAtDay:number,   createdAtMonth:number,  createdAtYear:number 
    ){
        try{
            const res=await RequestsDao.addRequest(
                orgUniqName,userEmail,rejectionReason,wfhReason,requestStatus,
                availedAtDay,   availedAtMonth,  availedAtYear, 
                approvalAtDay,  approvalAtMonth, approvalAtYear, 
                createdAtDay,   createdAtMonth,  createdAtYear 
            );
            if(!res){return {success:false};}
            return {success:true};        
        }catch(e){return {success:false};}
    }

    public static async getCalenderData(orgUniqName:string,userEmail:string){
        try{
            const res=await RequestsDao.getRequestsByOrgUniqNameAndUserEmail(orgUniqName,userEmail);
            if(!res){return {success:false};}

            let requestStatus=[]
            let rejectionReason=[]
            let wfhReason=[]

            let approvalAtDay=[]
            let approvalAtMonth=[]
            let approvalAtYear=[]

            let createdAtDay=[]
            let createdAtMonth=[]
            let createdAtYear=[]
            
            let availedAtDay=[]
            let availedAtMonth=[]
            let availedAtYear=[]        
            
            for(let i=0;i<res.length;i++){
                requestStatus.push(res[i].requestStatus)
                rejectionReason.push(res[i].rejectionReason)
                wfhReason.push(res[i].wfhReason)

                approvalAtDay.push(res[i].approvalAtDay)
                approvalAtMonth.push(res[i].approvalAtMonth)
                approvalAtYear.push(res[i].approvalAtYear)

                createdAtDay.push(res[i].createdAtDay)
                createdAtMonth.push(res[i].createdAtMonth)
                createdAtYear.push(res[i].createdAtYear)
                
                availedAtDay.push(res[i].availedAtDay)
                availedAtMonth.push(res[i].availedAtMonth)
                availedAtYear.push(res[i].availedAtYear)
            }
            return {success:true,requestStatus,rejectionReason,wfhReason,approvalAtDay,approvalAtMonth,approvalAtYear,createdAtDay,createdAtMonth,createdAtYear,availedAtDay,availedAtMonth,availedAtYear};
        }catch(e){return {success:false};}
    }    
}
