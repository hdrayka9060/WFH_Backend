import {Router} from 'express';
import {CommonContoller} from '../controllers/commonController';


const router=Router();

router.post('/requestWfh',CommonContoller.requestWfh)
router.post('/calender',CommonContoller.calender)


export default router;