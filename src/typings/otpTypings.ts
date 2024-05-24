export interface EmailOtpTime{
    email:string,
    otp:string,
    time:number
}

export interface SendOtpRequest{
    email:string
}

export interface VerifyOtpRequest{
    email:string,
    otp:string,
    userType:string,
    organisation:string
}

export interface VerifyUserOrgRequest{
    organisation:string
}

export interface VerifyUserRequest{
    email:string,
    organisation:string
}

export interface VerifySystemUserRequest{
    systemUserEmail:string
}