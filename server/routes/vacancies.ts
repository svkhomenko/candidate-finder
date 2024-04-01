import express from 'express';
import {
  createVacancy,
  getVacancyRecommendation,
  updateVacancy,
  deleteVacancy,
} from '../controllers/vacancies';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema, updateSchema } from '../validation/vacancies';

const router = express.Router();

router.post('/', validate(createSchema), boundary(createVacancy));
router.get('/:id/recommendations', boundary(getVacancyRecommendation));
router.put('/:id', validate(updateSchema), boundary(updateVacancy));
router.delete('/:id', boundary(deleteVacancy));

export default router;
