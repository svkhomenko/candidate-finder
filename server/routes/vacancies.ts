import express from 'express';
import { createVacancy } from '../controllers/vacancies';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema } from '../validation/vacancies';

const router = express.Router();

router.post('/', validate(createSchema), boundary(createVacancy));

export default router;
