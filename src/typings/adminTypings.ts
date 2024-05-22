export interface GetFilterRequestList{
    orgUniqName:string,
    filterType:string,
    requestStatus:string|undefined,
    user:string|undefined,
    date:Date|undefined
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
    wfh:number,
    availedAt:Date,
    createdAt:Date,
    requestStatus:string
}

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export interface TypedResponseBody<T> extends Express.Response {
    body: T
}

