import {z} from 'zod';
import {EmailZodSchema, OrganisationZodSchema, OtpZodSchema, SystemUserEmailZodSchema, UserTypeZodSchema} from './zodSchemas';

export const GetOtpZodSchema=z.object({})
                            .merge(EmailZodSchema)

export const VerifyOTPZodSchema=z.object({})
                                .merge(EmailZodSchema)
                                .merge(OtpZodSchema)
                                .merge(UserTypeZodSchema)
                                .merge(OrganisationZodSchema)
                                
export const VerifyUserOrgZodSchema=z.object({})
                                    .merge(OrganisationZodSchema)
                                
export const VerifyUserZodSchema=z.object({})
                                .merge(EmailZodSchema)
                                .merge(OrganisationZodSchema)

export const VerifySystemUserZodSchema=z.object({})
                                        .merge(SystemUserEmailZodSchema)