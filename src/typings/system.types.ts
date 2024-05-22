import { string } from "zod"

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