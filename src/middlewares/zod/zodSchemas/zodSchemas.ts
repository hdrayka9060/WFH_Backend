import {z} from 'zod';

export const EmailZodSchema=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(5, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"})
})

export const OrganisationZodSchema=z.object({
    organisation:z
    .string({required_error:"Organisation is required"})
    .trim()
    // .min(5, { message: "Organisation name must be at least of 5 chanracters" })
    .max(255,{message:"Organisation name must not be more than 255 chanracters"})
    // .or(z.undefined())
})

export const OtpZodSchema=z.object({
    otp:z
    .string({required_error:"OtP is required"})
    .length(6,{message:"Otp must be 6 digits long"})
    .regex(/^\d+$/,{message:"Not a valid OTP"})
})

export const UserTypeZodSchema=z.object({
    userType:z.enum(['system','admin','user'])
})

export const OrganisationUniqueNameZodSchema=z.object({
    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(3, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"})
})

export const OrganisationDisplayNameZodSchema=z.object({
    organisationDisplayName:z
    .string({required_error:"Organisation display name is required"})
    .trim()
    .min(3, { message: "Organisation display name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation display name must not be more than 255 chanracters"})
})

export const OrganisationMaxWfhZodSchema=z.object({
    organisationMaxWfh:z.number({required_error:"Max WFH is required"}).int({message:"Number Must be integer"})
})

export const OrganisationNewUniqueNameZodSchema=z.object({
    organisationNewUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(3, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"})
})

export const OrganisationNewDisplayNameZodSchema=z.object({
    organisationNewDisplayName:z
    .string({required_error:"Organisation display name is required"})
    .trim()
    .min(3, { message: "Organisation display name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation display name must not be more than 255 chanracters"})
})

export const OrganisationNewAdminZodSchema=z.object({
    organisationNewAdmin:z
    .string({required_error:"Admin Email is required"})
    .trim()
    .email({message:"Invalid admin email address"})
    .min(5, { message: " Admin Email must be at least of 5 chanracters" })
    .max(255,{message:"Admin Email must not be more than 255 chanracters"})
})

export const OrganisationNewMaxWfh=z.object({
    organisationNewMaxWfh:z.number({required_error:"Max WFH is required"}).int({message:"Number Must be integer"})
})

export const SystemUserEmailZodSchema=z.object({
    systemUserEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(5, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"})
})

export const OrganiationUserEmailZodSchema=z.object({
    organisationUserEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(5, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"})
})

export const FirstNameZodSchema=z.object({
    firstName:z
    .string({required_error:"First Name is required"})
    .trim()
    .min(3, { message: "First name must be at least of 3 chanracters" })
    .max(255,{message:"First name must not be more than 255 chanracters"})
})

export const LastNameZodSchema=z.object({
    lastName:z
    .string({required_error:"Last Name is required"})
    .trim()
    .min(3, { message: "Last name must be at least of 3 chanracters" })
    .max(255,{message:"Last name must not be more than 255 chanracters"})
})

export const DateOfBirthZodSchema=z.object({
    dateOfBirth:z
    .string({required_error: "Date of Birth is required"})
    .datetime()   
    // .min(new Date("1900-01-01"), { message: "Invalid Date of Birth" })
    // .max(new Date(), { message: "Invalid Date of Birth!" })
})

export const OrganisationUserOldEmailZodSchema=z.object({
    organisationUserOldEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(5, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"})
})

export const FilterTypeZodSchema=z.object({
    filterType:z.enum(['Request Status','Availed By', 'Availed At', 'Created At'])
})

export const RequestStatusZodSchema=z.object({
    requestStatus:z.enum(['Approved','Pending','Rejected',''])
})

export const UserZodSchema=z.object({
    user:z.string()
})

export const DateZodSchema=z.object({
    date:z.string().datetime().or(z.undefined())
})

export const AvailedAtZodSchema=z.object({
    availedAt:z.string({required_error: "AvailedAt is required"}).datetime()
})

export const RequestRejectionReasonZodSchema=z.object({
    requestRejectionReason:z
    .string({required_error:" Request Rejection Reason is required"})
    .trim()
    .min(5, { message: "Request Rejection Reason must be at least of 5 chanracters" })
    .max(500,{message:"Request Rejection Reason must not be more than 500 chanracters"})
})

export const RequestSubmissionReasonZodSchema=z.object({
    requestSubmissionReason:z
    .string({required_error:" Request Submission Reason is required"})
    .trim()
    .min(5, { message: "Request Submission Reason must be at least of 5 chanracters" })
    .max(500,{message:"Request Submission Reason must not be more than 500 chanracters"})
})

export const TokenZodSchema=z.object({
    token:z.string()
})