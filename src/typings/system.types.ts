export interface CreateOrganisation{
    orgUniqName:string, 
    orgDisplayName:string, 
    maxWfh:number
}

export interface EditOrganisation{
    oldOrgUniqName:string,
    orgUniqName:string, 
    orgDisplayName:string, 
    orgAdmin:string, 
    maxWfh:number
}

export interface AddUserService{
    orgUniqName:string,
    userEmail:string,
    firstName:string,
    lastName:string,
    dateOfBirth:Date
}

export interface EditUserService{
    userOldEmail:string,
    orgUniqName:string,
    userEmail:string,
    firstName:string,
    lastName:string,
    dateOfBirth:Date
}

export interface OrganisationList{
    id:number,
    orgUniqName:string,
    orgDisplayName:string,
    orgAdmin:string,
    maxWfh:number
}

export interface OrganisationData{
    id:number,
    firstName:string,
    lastName:string,
    userEmail:string,
    dateOfJoining:Date,
    dateOfBirth:Date,
    wfh:number
}

export interface SystemRow{
    email:string
}

export interface GetOrganisationListRequest{
    page:number,
    limit:number,
    email:string,
    organisation:string
}

export interface GetOrganisationDataRequest{
    organisationUniqueName:string,
    page:number,
    limit:number,
    email:string,
    organisation:string
}

export interface GetOrganisationUsersRequest{
    organisationUniqueName:string,
    email:string,
    organisation:string
}

export interface CreateOrganisationRequest{
    organisationUniqueName:string,
    organisationDisplayName:string,
    organisationMaxWfh:number,
    email:string,
    organisation:string
}

export interface EditOrganisationRequest{
    organisationUniqueName:string, 
    organisationNewUniqueName:string, 
    organisationNewDisplayName:string, 
    organisationNewAdmin:string, 
    organisationNewMaxWfh:number,
    email:string,
    organisation:string
}

export interface DeliveOrganisationRequest{
    organisationUniqueName:string,
    email:string,
    organisation:string
}

export interface AddUserRequest{
    organisationUniqueName:string, 
    organisationUserEmail:string, 
    firstName:string, 
    lastName:string, 
    dateOfBirth:Date,
    email:string,
    organisation:string
}

export interface EditUserRequest{
    organisationUserOldEmail:string,
    organisationUniqueName:string, 
    organisationUserEmail:string, 
    firstName:string, 
    lastName:string, 
    dateOfBirth:Date ,
    email:string,
    organisation:string
}

export interface RemoveUserRequest{
    organisationUniqueName:string, 
    organisationUserEmail:string,
    email:string,
    organisation:string
}