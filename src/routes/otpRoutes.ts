import {Router} from 'express';
import { OtpController } from '../controllers/otpController';

const router=Router();

router.post('/getotp',OtpController.getOtp);
router.post('/verifyotp',OtpController.verifyOtp);

export default router;
