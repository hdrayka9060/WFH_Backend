import {z} from 'zod';
import { AvailedAtZodSchema, DateZodSchema, FilterTypeZodSchema, OrganiationUserEmailZodSchema, RequestRejectionReasonZodSchema, RequestStatusZodSchema, UserZodSchema, PageZodSchema, LimitZodSchema} from './zodSchemas';

export const RequestListZodValidation=z.object({
    page:z.number({required_error:"Page number is required"}),
    limit:z.number({required_error:"Limit number is required"})
})

export const FilterRequestListZodSchema=z.object({
    filterType:z.enum(['Request Status','Availed By', 'Availed At', 'Created At']),
    requestStatus:z.enum(['Approved','Pending','Rejected','']),
    user:z.string(),
    date:z.string().datetime().or(z.undefined()),
    page:z.number({required_error:"Page number is required"}),
    limit:z.number({required_error:"Limit number is required"})
})

export const AcceptRequestZodSchema=z.object({
    organisationUserEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"}),

    availedAt:z.string({required_error: "AvailedAt is required"}).datetime()    
})
    
export const RejectRequestZodSchema=z.object({
    organisationUserEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"}),

    availedAt:z.string({required_error: "AvailedAt is required"}).datetime(),

    requestRejectionReason:z
    .string({required_error:" Request Rejection Reason is required"})
    .trim()
    .min(1, { message: "Request Rejection Reason must be at least of 5 chanracters" })
    .max(500,{message:"Request Rejection Reason must not be more than 500 chanracters"})
})
