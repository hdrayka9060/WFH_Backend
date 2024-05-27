export interface GetFilterRequestList{
    orgUniqName:string,
    filterType:string,
    requestStatus:string|undefined,
    user:string|undefined,
    date:Date|undefined,
    page:number,
    limit:number
}

export interface UpdateRequestService{
    orgUniqName:string,     
    userEmail:string, 
    requestStatus:string,
    availedAt:Date,   
    rejectionReason:string, 
    oldRequestStatus:string
}

export interface GetRequestList{
    id:number,
    name:string,
    userEmail:string,
    wfhReason:string,
    wfh:number,
    availedAt:Date,
    createdAt:Date,
    requestStatus:string
}

export interface GetRequestListRequest{
    page:number,
    limit:number,
    email:string,
    organisation:string
}

export interface GetUsersListRequest{
    email:string,
    organisation:string
}

export interface GetFilterRequestListRequest{
    filterType:string,
    requestStatus:string,
    user:string,
    date:Date,
    page:number,
    limit:number,
    email:string,
    organisation:string
}

export interface AcceptRequestRequest{
    organisationUserEmail:string,
    availedAt:Date,
    email:string,
    organisation:string
}

export interface RejectRequestRequest{
    organisationUserEmail:string,
    availedAt:Date,
    requestRejectionReason:string,
    email:string,
    organisation:string
}

export interface ClearRequestRequest{
    requestStatus:string,
    organisationUserEmail:string,
    availedAt:Date,
    requestRejectionReason:string,
    email:string,
    organisation:string
}