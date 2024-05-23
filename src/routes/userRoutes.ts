import {Router} from 'express';
import {CommonContoller} from '../controllers/commonController';
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { RequestWfhZodSchema } from '../middlewares/zod/zodSchemas/commonZodSchemas';


const router=Router();

router.post('/requestwfh',ZodMiddleware.zodValidation(RequestWfhZodSchema),JwtMiddleware.jwtVerifyOrgUser,CommonContoller.requestWfh)
router.get('/calender',JwtMiddleware.jwtVerifyOrgUser,CommonContoller.calender)
router.get('/userwfh',JwtMiddleware.jwtVerifyOrgUser,CommonContoller.userWfh)


export default router;

// router.post('/requestWfh',ZodMiddleware.zodValidation(RequestWfhZodSchema),JwtMiddleware.jwtVerifyOrgUser,CommonContoller.requestWfh)
// router.post('/calender',JwtMiddleware.jwtVerifyOrgUser,CommonContoller.calender)