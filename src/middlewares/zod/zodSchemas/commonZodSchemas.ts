import {z} from 'zod';
import { AvailedAtZodSchema, RequestSubmissionReasonZodSchema, TokenZodSchema } from './zodSchemas';

export const RequestWfhZodSchema=z.object({})
                                  .merge(AvailedAtZodSchema)
                                  .merge(RequestSubmissionReasonZodSchema)
