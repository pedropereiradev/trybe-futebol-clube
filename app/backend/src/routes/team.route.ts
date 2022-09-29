import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

const router = Router();

router.get('/:id', TeamController.findOne);
router.get('/', TeamController.findAll);

export default router;
