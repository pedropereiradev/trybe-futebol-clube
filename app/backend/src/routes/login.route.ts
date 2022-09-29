import { Router } from 'express';
import UserController from '../controllers/User.controller';

const router = Router();

router.post('/', UserController.login);

router.get('/validate', UserController.getUserRole);

export default router;
