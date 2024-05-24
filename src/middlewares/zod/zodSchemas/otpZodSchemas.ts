import {z} from 'zod';
import {EmailZodSchema, OrganisationZodSchema, OtpZodSchema, SystemUserEmailZodSchema, UserTypeZodSchema} from './zodSchemas';

export const GetOtpZodSchema=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"})
})

export const VerifyOTPZodSchema=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"}),

    otp:z
    .string({required_error:"OtP is required"})
    .length(6,{message:"Otp must be 6 digits long"})
    .regex(/^\d+$/,{message:"Not a valid OTP"}),

    userType:z.enum(['system','admin','user']),

    organisation:z
    .string({required_error:"Organisation is required"})
    .trim()
    .min(0, { message: "Organisation name must be at least of 5 chanracters" })
    .max(255,{message:"Organisation name must not be more than 255 chanracters"})
})
                                
export const VerifyUserOrgZodSchema=z.object({
    organisation:z
    .string({required_error:"Organisation is required"})
    .trim()
    .min(0, { message: "Organisation name must be at least of 5 chanracters" })
    .max(255,{message:"Organisation name must not be more than 255 chanracters"})
})
                                
export const VerifyUserZodSchema=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"}),

    organisation:z
    .string({required_error:"Organisation is required"})
    .trim()
    .min(0, { message: "Organisation name must be at least of 5 chanracters" })
    .max(255,{message:"Organisation name must not be more than 255 chanracters"})
})

export const VerifySystemUserZodSchema=z.object({
    systemUserEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"})
})