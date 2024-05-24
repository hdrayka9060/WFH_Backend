export interface AddOrganisation{
    orgUniqName:string, 
    orgDisplayName:string, 
    maxWfh:number
}

export interface EditOrganisation{
    oldOrgUniqName:string, 
    orgUniqName:string, 
    orgDisplayName:string, 
    orgAdmin:string, 
    maxWfh:number,
}

export interface OrganisationRow{
    orgUniqName:string,
    orgDisplayName:string,
    orgAdmin:string,
    maxWfh:number,
    deleted:boolean
}