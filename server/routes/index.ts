import express from 'express';
import auth from './auth';
import resumes from './resumes';
import vacancies from './vacancies';

const router = express.Router();

router.use('/auth', auth);
router.use('/resumes', resumes);
router.use('/vacancies', vacancies);

export default router;
