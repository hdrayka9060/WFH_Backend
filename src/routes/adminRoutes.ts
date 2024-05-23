import {Router} from 'express';
import {AdminController} from '../controllers/adminController';
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { AcceptRequestZodSchema, FilterRequestListZodSchema,RejectRequestZodSchema,RequestListZodValidation } from '../middlewares/zod/zodSchemas/adminZodSchema';

const router=Router();

router.post('/requestlist',ZodMiddleware.zodValidation(RequestListZodValidation),JwtMiddleware.jwtVerifyAdminUser,AdminController.requestList)
router.get('/userslist',JwtMiddleware.jwtVerifyAdminUser,AdminController.usersList)
router.post('/filter-requestlist',ZodMiddleware.zodValidation(FilterRequestListZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.filterRequestList)
router.put('/acceptrequest',ZodMiddleware.zodValidation(AcceptRequestZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.acceptRequest)
router.put('/rejectrequest',ZodMiddleware.zodValidation(RejectRequestZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.rejectRequest)


// router.post('/requestlist',JwtMiddleware.jwtVerifyAdminUser,AdminController.requestList)
// router.post('/userslist',JwtMiddleware.jwtVerifyAdminUser,AdminController.usersList)
// router.post('/filter-requestlist',JwtMiddleware.jwtVerifyAdminUser,AdminController.filterRequestList)
// router.post('/acceptrequest',JwtMiddleware.jwtVerifyAdminUser,AdminController.acceptRequest)
// router.post('/rejectrequest',JwtMiddleware.jwtVerifyAdminUser,AdminController.rejectRequest)
// router.post('/requestwfh',JwtMiddleware.jwtVerifyAdminUser,CommonContoller.requestWfh)
// router.post('/calender',JwtMiddleware.jwtVerifyAdminUser,CommonContoller.calender)
// router.post('/userwfh',JwtMiddleware.jwtVerifyAdminUser,CommonContoller.userWfh)

export default router;
