import express from 'express';
import { register, confirmEmail, login, refresh, logout } from '../controllers/auth';
import validate from '../utils/validation';
import { registerSchema, loginSchema } from '../validation/user';
import boundary from '../utils/error-boundary';

const router = express.Router();

router.post('/register', validate(registerSchema), boundary(register));
router.post('/confirm-email/:token', boundary(confirmEmail));
router.post('/login', validate(loginSchema), boundary(login));
router.post('/refresh', boundary(refresh));
router.post('/logout', boundary(logout));

export default router;
