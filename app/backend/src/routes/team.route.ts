import { Router } from 'express';
import TeamService from '../services/Team.service';
import TeamController from '../controllers/Team.controller';
import Teams from '../database/models/Teams';

const router = Router();

const teamController = new TeamController(new TeamService(Teams));

router.get('/:id', (req, res) => teamController.findOne(req, res));
router.get('/', (req, res) => teamController.findAll(req, res));

export default router;
