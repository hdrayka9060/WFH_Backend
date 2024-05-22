import {z} from 'zod';
import { AvailedAtZodSchema, DateZodSchema, FilterTypeZodSchema, OrganiationUserEmailZodSchema, RequestRejectionReasonZodSchema, RequestStatusZodSchema, UserZodSchema, TokenZodSchema } from './zodSchemas';

export const FilterRequestListZodSchema=z.object({})
                                         .merge(FilterTypeZodSchema)
                                         .merge(RequestStatusZodSchema)
                                         .merge(UserZodSchema)
                                         .merge(DateZodSchema)

export const AcceptRequestZodSchema=z.object({})
                                     .merge(OrganiationUserEmailZodSchema)
                                     .merge(AvailedAtZodSchema)
    
export const RejectRequestZodSchema=z.object({})
                                     .merge(OrganiationUserEmailZodSchema)
                                     .merge(AvailedAtZodSchema)
                                     .merge(RequestRejectionReasonZodSchema)
