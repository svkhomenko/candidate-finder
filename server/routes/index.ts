import express from 'express';
import resumes from './resumes';
import vacancies from './vacancies';

const router = express.Router();

router.use('/resumes', resumes);
router.use('/vacancies', vacancies);

export default router;
