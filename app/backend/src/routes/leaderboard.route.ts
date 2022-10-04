import { Router } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHome.service';
import LeaderboardController from '../controllers/Leaderboard.controller';
import LeaderboardAwayService from '../services/LeaderboardAway.service';
import LeaderboardCompleteService from '../services/LeaderboardComplete.service';

const router = Router();

const leaderboardHomeService = new LeaderboardHomeService();
const leaderboardAwayService = new LeaderboardAwayService();
const leaderboardCompleteService = new LeaderboardCompleteService(
  leaderboardHomeService,
  leaderboardAwayService,
);

const leaderboardController = new LeaderboardController(
  leaderboardHomeService,
  leaderboardAwayService,
  leaderboardCompleteService,
);

router.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
router.get('/away', (req, res) => leaderboardController.getAwayLeaderboard(req, res));
router.get('/', (req, res) => leaderboardController.getCompleteLeaderboard(req, res));

export default router;
