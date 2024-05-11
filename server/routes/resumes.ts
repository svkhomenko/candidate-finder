import express from 'express';
import {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  createResumeLanguageLevel,
  updateResumeLanguageLevel,
  deleteResumeLanguageLevel,
} from '../controllers/resumes';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import {
  createSchema,
  updateSchema,
  createResumeLanguageLevelsSchema,
  updateResumeLanguageLevelsSchema,
  getResumesSchema,
} from '../validation/resumes';
import auth from '../middleware/auth';
import { checkCandidateRights, checkUserResumeRights } from '../middleware/check-rights';

const router = express.Router();

router.get('/', validate(getResumesSchema, 'query'), boundary(getResumes));
router.get('/:id', boundary(getResumeById));

router.use(auth);

router.post('/', checkCandidateRights, validate(createSchema), boundary(createResume));
router.put('/:id', checkUserResumeRights, validate(updateSchema), boundary(updateResume));
router.delete('/:id', checkUserResumeRights, boundary(deleteResume));

router.post(
  '/:id/languages',
  checkUserResumeRights,
  validate(createResumeLanguageLevelsSchema),
  boundary(createResumeLanguageLevel),
);
router.put(
  '/:id/languages/:language',
  checkUserResumeRights,
  validate(updateResumeLanguageLevelsSchema),
  boundary(updateResumeLanguageLevel),
);
router.delete(
  '/:id/languages/:language',
  checkUserResumeRights,
  boundary(deleteResumeLanguageLevel),
);

export default router;
