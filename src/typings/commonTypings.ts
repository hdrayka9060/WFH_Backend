export interface RequestWfh{
    orgUniqName:string, 
    userEmail:string, 
    rejectionReason:string, 
    wfhReason:string, 
    requestStatus:string, 
    availedAt:Date, 
    createdAt:Date
}

export interface CalenderData{
    requestStatus:string,
    rejectionReason:string,
    wfhReason:string,
    approvalAt:Date,
    createdAt:Date,
    availedAt:Date
}

export interface AddWfhRequestRequest{
    availedAt:Date,
    requestSubmissionReason:string,
    email:string,
    organisation:string
}

export interface GetUserWfhRequest{
    email:string,
    organisation:string
}

export interface GetWfhRequestsRequest{
    email:string,
    organisation:string
}