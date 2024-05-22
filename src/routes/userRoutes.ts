import {Router} from 'express';
import {CommonContoller} from '../controllers/commonController';
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { RequestWfhZodSchema } from '../middlewares/zod/zodSchemas/commonZodSchemas';


const router=Router();

router.post('/requestWfh',JwtMiddleware.jwtVerifyOrgUser,CommonContoller.requestWfh)
router.post('/calender',JwtMiddleware.jwtVerifyOrgUser,CommonContoller.calender)


export default router;

// router.post('/requestWfh',ZodMiddleware.zodValidation(RequestWfhZodSchema),JwtMiddleware.jwtVerifyOrgUser,CommonContoller.requestWfh)
// router.post('/calender',JwtMiddleware.jwtVerifyOrgUser,CommonContoller.calender)