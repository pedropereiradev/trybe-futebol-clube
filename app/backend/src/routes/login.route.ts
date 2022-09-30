import { Router } from 'express';
import UserService from '../services/User.service';
import UserController from '../controllers/User.controller';
import Users from '../database/models/Users';

const router = Router();

const userController = new UserController(new UserService(Users));

router.post('/', (req, res, next) => userController.login(req, res, next));

router.get('/validate', (req, res, next) => userController.getUserRole(req, res, next));

export default router;
