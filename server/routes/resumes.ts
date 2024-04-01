import express from 'express';
import { createResume, updateResume, deleteResume } from '../controllers/resumes';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema, updateSchema } from '../validation/resumes';

const router = express.Router();

router.post('/', validate(createSchema), boundary(createResume));
router.put('/:id', validate(updateSchema), boundary(updateResume));
router.delete('/:id', boundary(deleteResume));

export default router;
