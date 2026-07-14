const Score = require("../models/Score");
const User = require("../models/User");

exports.submitScore = async (
  req,
  res
) => {
  try {
    const { score } = req.body;

    const savedScore =
      await Score.create({
        user: req.user._id,
        score,
      });

    const user =
      await User.findById(
        req.user._id
      );

    user.xp += score * 10;

    if (
      user.xp >= 100 &&
      !user.badges.includes(
        "Bronze Star"
      )
    ) {
      user.badges.push(
        "Bronze Star"
      );
    }

    if (
      user.xp >= 300 &&
      !user.badges.includes(
        "Silver Star"
      )
    ) {
      user.badges.push(
        "Silver Star"
      );
    }

    if (
      user.xp >= 500 &&
      !user.badges.includes(
        "Gold Star"
      )
    ) {
      user.badges.push(
        "Gold Star"
      );
    }

    await user.save();

    res.json(savedScore);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.leaderboard = async (
  req,
  res
) => {
  try {
    const users =
      await User.find({ role: "student" })
        .sort({
          xp: -1,
        })
        .select(
          "name xp badges grade"
        );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};