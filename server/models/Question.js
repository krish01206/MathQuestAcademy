const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    grade: {
      type: Number,
      required: true,
    },

    level: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Question",
  questionSchema
);