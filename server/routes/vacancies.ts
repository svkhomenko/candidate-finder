import express from 'express';
import { createVacancy, getVacancyRecommendation } from '../controllers/vacancies';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema } from '../validation/vacancies';

const router = express.Router();

router.post('/', validate(createSchema), boundary(createVacancy));
router.get('/:id/recommendations', boundary(getVacancyRecommendation));

export default router;
