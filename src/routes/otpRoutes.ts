import {Router} from 'express';
import { OtpController } from '../controllers/otpController';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { GetOtpZodSchema, VerifyOTPZodSchema, VerifySystemUserZodSchema, VerifyUserOrgZodSchema, VerifyUserZodSchema } from '../middlewares/zod/zodSchemas/otpZodSchemas';

const router=Router();

router.post('/getotp',ZodMiddleware.zodValidation(GetOtpZodSchema),OtpController.getOtp);
router.get('/organisations',OtpController.getOrganisations);
router.post('/verifyotp',ZodMiddleware.zodValidation(VerifyOTPZodSchema),OtpController.verifyOtp);
router.post('/verify-user',ZodMiddleware.zodValidation(VerifyUserZodSchema),OtpController.verifyUser);
router.post('/verify-user-org',ZodMiddleware.zodValidation(VerifyUserOrgZodSchema),OtpController.verifyUserOrg);
router.post('/verify-system-user',ZodMiddleware.zodValidation(VerifySystemUserZodSchema),OtpController.verifySystemUser)

// router.post('/getotp',OtpController.getOtp);
// router.post('/organisations',OtpController.getOrganisations);
// router.post('/verifyotp',OtpController.verifyOtp);
// router.post('/verify-user',OtpController.verifyUser);
// router.post('/verify-user-org',OtpController.verifyUserOrg);
// router.post('/verify-system-user',OtpController.verifySystemUser)

export default router;

