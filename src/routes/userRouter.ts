import { Router } from 'express';
import UserControllers from '../controllers/UserControllers';

const router = Router();

router.get('/submit', UserControllers.submit);
router.put('/checkNewReq', UserControllers.checkNewReq);

export default router;
