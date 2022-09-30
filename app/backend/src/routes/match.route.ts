import { Router } from 'express';
import MatchController from '../controllers/Match.controller';
import Matches from '../database/models/Matches';
import MatchService from '../services/Match.service';

const router = Router();

const matchController = new MatchController(new MatchService(Matches));

router.get('/', (req, res) => matchController.findAll(req, res));
router.post('/', (req, res) => matchController.create(req, res));
router.patch('/:id/finish', (req, res) => matchController.updateInProgress(req, res));
router.patch('/:id', (req, res) => matchController.updateGoals(req, res));

export default router;
