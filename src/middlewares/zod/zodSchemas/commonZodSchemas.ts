import {z} from 'zod';
import { AvailedAtZodSchema, RequestSubmissionReasonZodSchema, TokenZodSchema } from './zodSchemas';

export const RequestWfhZodSchema=z.object({
    availedAt:z.string({required_error: "AvailedAt is required"}).datetime(),

    requestSubmissionReason:z
    .string({required_error:" Request Submission Reason is required"})
    .trim()
    .min(1, { message: "Request Submission Reason must be at least of 5 chanracters" })
    .max(500,{message:"Request Submission Reason must not be more than 500 chanracters"})
})
