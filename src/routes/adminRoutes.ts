import {Router} from 'express';
import {AdminController} from '../controllers/adminController';
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { AcceptRequestZodSchema, FilterRequestListZodSchema,RejectRequestZodSchema,RequestListZodValidation } from '../middlewares/zod/zodSchemas/adminZodSchema';

const router=Router();

router.post('/requestlist',ZodMiddleware.zodValidation(RequestListZodValidation),JwtMiddleware.jwtVerifyAdminUser,AdminController.getRequestsList)
router.get('/userslist',JwtMiddleware.jwtVerifyAdminUser,AdminController.getUsersList)
router.post('/filter-requestlist',ZodMiddleware.zodValidation(FilterRequestListZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.getFilteredRequestList)
router.put('/acceptrequest',ZodMiddleware.zodValidation(AcceptRequestZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.acceptRequest)
router.put('/rejectrequest',ZodMiddleware.zodValidation(RejectRequestZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.rejectRequest)

export default router;
