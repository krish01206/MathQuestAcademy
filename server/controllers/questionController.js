const Question = require("../models/Question");

exports.getQuestions = async (req, res) => {
  try {
    const grade = req.params.grade;

    const questions = await Question.find({
      grade,
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    // Role-based check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Admin authority required",
      });
    }

    const { question, options, answer, grade, level } = req.body;

    if (!question || !options || !answer || !grade || !level) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const newQuestion = await Question.create({
      question,
      options,
      answer,
      grade: Number(grade),
      level,
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};