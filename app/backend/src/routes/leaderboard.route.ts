import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';
import LeaderboardService from '../services/Leaderboard.service';

const router = Router();

const leaderboardController = new LeaderboardController(new LeaderboardService());

router.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));

export default router;
