import {Router} from 'express';
import {AdminController} from '../controllers/adminController';
import {CommonContoller} from '../controllers/commonController';

const router=Router();

router.post('/requestlist',AdminController.requestList)
router.post('/acceptrequest',AdminController.acceptRequest)
router.post('/rejectrequest',AdminController.rejectRequest)
router.post('/requestwfh',CommonContoller.requestWfh)
router.post('/calender',CommonContoller.calender)

export default router;
