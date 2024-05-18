import express from 'express';
import { getUserById } from '../controllers/users';
import boundary from '../utils/error-boundary';

const router = express.Router();

router.get('/:id', boundary(getUserById));

export default router;
