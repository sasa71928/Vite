import { Router } from 'express';
import { registerUser, verifyUser, loginUser } from './users.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/login', loginUser);

export default router;