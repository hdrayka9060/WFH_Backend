export interface AddUser{
    orgUniqName:string,
    userEmail:string,
    firstName:string,
    lastName:string,
    dateOfBirth:Date
}

export interface EditUser{
    userOldEmail:string,
    orgUniqName:string,
    userEmail:string,
    firstName:string,
    lastName:string,
    dateOfBirth:Date
}

export interface UpdateUserWfh{
    userEmail:string,
    orgUniqName:string,
    wfh:number
}

export interface UserRow{
    userEmail:string,
    orgUniqName:string,
    firstName:string,
    lastName:string,
    wfh:number,
    dateOfJoining:Date,
    dateOfBirth:Date,
    deleted:boolean
}