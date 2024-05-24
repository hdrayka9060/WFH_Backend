import {Router} from 'express';
import {CommonContoller} from '../controllers/commonController';
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { RequestWfhZodSchema } from '../middlewares/zod/zodSchemas/commonZodSchemas';


const router=Router();

router.post('/requestwfh',ZodMiddleware.zodValidation(RequestWfhZodSchema),JwtMiddleware.jwtVerifyOrgUser,CommonContoller.addWfhRequest)
router.get('/calender',JwtMiddleware.jwtVerifyOrgUser,CommonContoller.getWfhRequests)
router.get('/userwfh',JwtMiddleware.jwtVerifyOrgUser,CommonContoller.getUserWfh)

export default router;