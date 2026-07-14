const express = require(
  "express"
);

const router =
  express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  submitScore,
  leaderboard,
} = require(
  "../controllers/scoreController"
);

router.post(
  "/submit",
  protect,
  submitScore
);

router.get(
  "/leaderboard",
  leaderboard
);

module.exports = router;