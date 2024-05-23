import {z} from 'zod';
import { AvailedAtZodSchema, DateZodSchema, FilterTypeZodSchema, OrganiationUserEmailZodSchema, RequestRejectionReasonZodSchema, RequestStatusZodSchema, UserZodSchema, PageZodSchema, LimitZodSchema} from './zodSchemas';

export const RequestListZodValidation=z.object({})
                                       .merge(PageZodSchema)
                                       .merge(LimitZodSchema)

export const FilterRequestListZodSchema=z.object({})
                                         .merge(FilterTypeZodSchema)
                                         .merge(RequestStatusZodSchema)
                                         .merge(UserZodSchema)
                                         .merge(DateZodSchema)
                                         .merge(PageZodSchema)
                                         .merge(LimitZodSchema)

export const AcceptRequestZodSchema=z.object({})
                                     .merge(OrganiationUserEmailZodSchema)
                                     .merge(AvailedAtZodSchema)
    
export const RejectRequestZodSchema=z.object({})
                                     .merge(OrganiationUserEmailZodSchema)
                                     .merge(AvailedAtZodSchema)
                                     .merge(RequestRejectionReasonZodSchema)
