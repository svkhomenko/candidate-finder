import express from 'express';
import auth from './auth';
import profile from './profile';
import users from './users';
import resumes from './resumes';
import vacancies from './vacancies';

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/users', users);
router.use('/resumes', resumes);
router.use('/vacancies', vacancies);

export default router;
