const User = require("../models/User");
const Question = require("../models/Question");
const Score = require("../models/Score");

exports.getAnalytics = async (req, res) => {
  try {
    const totalStudents =
      await User.countDocuments({ role: "student" });

    const totalQuestions =
      await Question.countDocuments();

    const totalAttempts =
      await Score.countDocuments();

    const topStudents = await User.find({ role: "student" })
      .sort({
        xp: -1,
      })
      .limit(5)
      .select("name xp");

    res.json({
      totalStudents,
      totalQuestions,
      totalAttempts,
      topStudents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};