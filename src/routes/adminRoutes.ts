import {Router} from 'express';
import {AdminController} from '../controllers/adminController';
import {CommonContoller} from '../controllers/commonController';
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { AcceptRequestZodSchema, FilterRequestListZodSchema,RejectRequestZodSchema } from '../middlewares/zod/zodSchemas/adminZodSchema';
import { RequestWfhZodSchema } from '../middlewares/zod/zodSchemas/commonZodSchemas';

const router=Router();

router.post('/requestlist',JwtMiddleware.jwtVerifyAdminUser,AdminController.requestList)
router.post('/userslist',JwtMiddleware.jwtVerifyAdminUser,AdminController.usersList)
router.post('/filter-requestlist',ZodMiddleware.zodValidation(FilterRequestListZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.filterRequestList)
router.post('/acceptrequest',ZodMiddleware.zodValidation(AcceptRequestZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.acceptRequest)
router.post('/rejectrequest',ZodMiddleware.zodValidation(RejectRequestZodSchema),JwtMiddleware.jwtVerifyAdminUser,AdminController.rejectRequest)
router.post('/requestwfh',ZodMiddleware.zodValidation(RequestWfhZodSchema),JwtMiddleware.jwtVerifyAdminUser,CommonContoller.requestWfh)
router.post('/calender',JwtMiddleware.jwtVerifyAdminUser,CommonContoller.calender)
router.post('/userwfh',JwtMiddleware.jwtVerifyAdminUser,CommonContoller.userWfh)

// router.post('/requestlist',JwtMiddleware.jwtVerifyAdminUser,AdminController.requestList)
// router.post('/userslist',JwtMiddleware.jwtVerifyAdminUser,AdminController.usersList)
// router.post('/filter-requestlist',JwtMiddleware.jwtVerifyAdminUser,AdminController.filterRequestList)
// router.post('/acceptrequest',JwtMiddleware.jwtVerifyAdminUser,AdminController.acceptRequest)
// router.post('/rejectrequest',JwtMiddleware.jwtVerifyAdminUser,AdminController.rejectRequest)
// router.post('/requestwfh',JwtMiddleware.jwtVerifyAdminUser,CommonContoller.requestWfh)
// router.post('/calender',JwtMiddleware.jwtVerifyAdminUser,CommonContoller.calender)
// router.post('/userwfh',JwtMiddleware.jwtVerifyAdminUser,CommonContoller.userWfh)

export default router;
