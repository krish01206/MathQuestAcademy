const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getQuestions,
  createQuestion,
} = require("../controllers/questionController");

router.get("/:grade", getQuestions);
router.post("/", protect, createQuestion);

module.exports = router;