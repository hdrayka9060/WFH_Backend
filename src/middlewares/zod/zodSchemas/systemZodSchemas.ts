import {z} from 'zod';
import { DateOfBirthZodSchema, FirstNameZodSchema, LastNameZodSchema, OrganiationUserEmailZodSchema, OrganisationDisplayNameZodSchema, OrganisationMaxWfhZodSchema, OrganisationNewDisplayNameZodSchema, OrganisationNewMaxWfh, OrganisationNewUniqueNameZodSchema, OrganisationUniqueNameZodSchema, OrganisationUserOldEmailZodSchema, OrganisationNewAdminZodSchema,LimitZodSchema,PageZodSchema } from './zodSchemas';

export const OrganisationListZodSchema=z.object({
    page:z.number({required_error:"Page number is required"}),
    limit:z.number({required_error:"Limit number is required"})
})

export const OrganisationDataZodSchema=z.object({
    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"}),

    page:z.number({required_error:"Page number is required"}),
    limit:z.number({required_error:"Limit number is required"})
})

export const OrganisationUsersZodSchema=z.object({
    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"})
})

export const CreateOrganisationZodSchema=z.object({
    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"}),

    organisationDisplayName:z
    .string({required_error:"Organisation display name is required"})
    .trim()
    .min(1, { message: "Organisation display name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation display name must not be more than 255 chanracters"}),

    organisationMaxWfh:z.number({required_error:"Max WFH is required"}).int({message:"Number Must be integer"})
})

export const EditOrganisationZodSchema=z.object({
    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"}),

    organisationNewUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"}),
    
    organisationNewDisplayName:z
    .string({required_error:"Organisation display name is required"})
    .trim()
    .min(1, { message: "Organisation display name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation display name must not be more than 255 chanracters"}),

    organisationNewMaxWfh:z.number({required_error:"Max WFH is required"}).int({message:"Number Must be integer"}),

    organisationNewAdmin:z
    .string()
    .trim()
    .min(0, { message: " Admin Email must be at least of 5 chanracters" })
    .max(255,{message:"Admin Email must not be more than 255 chanracters"})
    .email({message:"Invalid admin email address"})
    .or(z.undefined()),
})

export const DeleteOrganisationZodSchema=z.object({
    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"})
})

export const AddUserZodSchema=z.object({
    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"}),

    organisationUserEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"}),

    firstName:z
    .string({required_error:"First Name is required"})
    .trim()
    .min(1, { message: "First name must be at least of 3 chanracters" })
    .max(255,{message:"First name must not be more than 255 chanracters"}),

    lastName:z
    .string({required_error:"Last Name is required"})
    .trim()
    .min(1, { message: "Last name must be at least of 3 chanracters" })
    .max(255,{message:"Last name must not be more than 255 chanracters"}),

    dateOfBirth:z
    .string({required_error: "Date of Birth is required"})
    .datetime()   
})

export const EditUseZodSchema=z.object({
    organisationUserOldEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"}),

    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"}),

    organisationUserEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"}),

    firstName:z
    .string({required_error:"First Name is required"})
    .trim()
    .min(1, { message: "First name must be at least of 3 chanracters" })
    .max(255,{message:"First name must not be more than 255 chanracters"}),

    lastName:z
    .string({required_error:"Last Name is required"})
    .trim()
    .min(1, { message: "Last name must be at least of 3 chanracters" })
    .max(255,{message:"Last name must not be more than 255 chanracters"}),

    dateOfBirth:z
    .string({required_error: "Date of Birth is required"})
    .datetime()   
})

export const RemoveUserZodSchema=z.object({
    organisationUniqueName:z
    .string({required_error:"Organisation unique name is required"})
    .trim()
    .min(1, { message: "Organisation unique name must be at least of 3 chanracters" })
    .max(255,{message:"Organisation unique name must not be more than 255 chanracters"}),

    organisationUserEmail:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(1, { message: "Email must be at least of 5 chanracters" })
    .max(255,{message:"Email must not be more than 255 chanracters"})
})
