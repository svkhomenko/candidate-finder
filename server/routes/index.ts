import express from 'express';
import resumes from './resumes';

const router = express.Router();

router.use('/resumes', resumes);

export default router;
