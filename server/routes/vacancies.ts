import express from 'express';
import {
  getVacancies,
  getVacancyById,
  getVacancyRecommendation,
  createVacancy,
  updateVacancy,
  deleteVacancy,
  getVacancyLanguageLevels,
  createVacancyLanguageLevel,
  updateVacancyLanguageLevel,
  deleteVacancyLanguageLevel,
} from '../controllers/vacancies';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import {
  createSchema,
  updateSchema,
  createVacancyLanguageLevelsSchema,
  updateVacancyLanguageLevelsSchema,
  getVacanciesSchema,
} from '../validation/vacancies';
import auth from '../middleware/auth';
import { checkHRRights, checkUserVacancyRights } from '../middleware/check-rights';

const router = express.Router();

router.get('/', validate(getVacanciesSchema, 'query'), boundary(getVacancies));
router.get('/:id', boundary(getVacancyById));
router.get('/:id/languages', boundary(getVacancyLanguageLevels));

router.use(auth);

router.get('/:id/recommendation', checkUserVacancyRights, boundary(getVacancyRecommendation));
router.post('/', checkHRRights, validate(createSchema), boundary(createVacancy));
router.put('/:id', checkUserVacancyRights, validate(updateSchema), boundary(updateVacancy));
router.delete('/:id', checkUserVacancyRights, boundary(deleteVacancy));

router.post(
  '/:id/languages',
  checkUserVacancyRights,
  validate(createVacancyLanguageLevelsSchema),
  boundary(createVacancyLanguageLevel),
);
router.put(
  '/:id/languages/:language',
  checkUserVacancyRights,
  validate(updateVacancyLanguageLevelsSchema),
  boundary(updateVacancyLanguageLevel),
);
router.delete(
  '/:id/languages/:language',
  checkUserVacancyRights,
  boundary(deleteVacancyLanguageLevel),
);

export default router;
