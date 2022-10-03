import { Router } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHome.service';
import LeaderboardController from '../controllers/Leaderboard.controller';
import LeaderboardService from '../services/Leaderboard.service';
import LeaderboardAwayService from '../services/LeaderboardAway.service';

const router = Router();

const leaderboardService = new LeaderboardService();
const leaderboardHomeService = new LeaderboardHomeService();
const leaderboardAwayService = new LeaderboardAwayService();

const leaderboardController = new LeaderboardController(
  leaderboardService,
  leaderboardHomeService,
  leaderboardAwayService,
);

router.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
router.get('/away', (req, res) => leaderboardController.getAwayLeaderboard(req, res));

export default router;
