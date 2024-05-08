import express from 'express';
import { getProfile, updateProfile, deleteProfile } from '../controllers/profile';
import auth from '../middleware/auth';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { updateSchema } from '../validation/user';

const router = express.Router();

router.use(auth);

router.get('/', boundary(getProfile));
router.put('/', validate(updateSchema), boundary(updateProfile));
router.delete('/', boundary(deleteProfile));

export default router;
