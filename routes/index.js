import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import auth from '../middlewares/auth';

const router = Router();
router.use('/cards', auth, cardRouter);
router.use('/users', auth, userRouter);

export default router;
