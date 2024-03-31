import express from 'express';
import { createResume } from '../controllers/resumes';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema } from '../validation/resumes';

const router = express.Router();

router.post('/', validate(createSchema), boundary(createResume));

export default router;
