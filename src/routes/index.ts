import express from 'express';
import otpRoutes from './otpRoutes';
import systemRoutes from './systemRoutes'
import adminRoutes from './adminRoutes'
import userRoutes from './userRoutes'

const router=express.Router();

router.use('/otpvalidation',otpRoutes);
router.use('/system',systemRoutes);
router.use('/admin',adminRoutes);
router.use('/user',userRoutes);

export default router;