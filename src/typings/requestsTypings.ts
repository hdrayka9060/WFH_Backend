export interface AddRequest{
    orgUniqName:string, 
    userEmail:string, 
    rejectionReason:string, 
    wfhReason:string, 
    requestStatus:string, 
    availedAt:Date, 
    createdAt:Date 
}

export interface UpdateRequest{
    orgUniqName:string,     
    userEmail:string,        
    requestStatus:string,   
    availedAt:Date,     
    rejectionReason:string, 
    oldRequestStatus:string
}

export interface RequestsRow{
    orgUniqName:string,
    userEmail:string,
    requestStatus:string,
    rejectionReason:string,
    wfhReason:string,
    deleted:boolean,
    approvalAt:Date,
    createdAt:Date,
    availedAt:Date
}