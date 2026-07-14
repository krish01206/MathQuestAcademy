const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./models/Question");

dotenv.config();

const questions = [
  // Grade 1
  {
    question: "What is 5 + 3?",
    options: ["6", "7", "8", "9"],
    answer: "8",
    grade: 1,
    level: "easy",
  },
  {
    question: "Which number is smaller: 12 or 17?",
    options: ["12", "17", "They are equal", "None"],
    answer: "12",
    grade: 1,
    level: "easy",
  },
  {
    question: "What shape has 3 sides?",
    options: ["Circle", "Square", "Triangle", "Rectangle"],
    answer: "Triangle",
    grade: 1,
    level: "easy",
  },
  {
    question: "If you have 4 apples and eat 2, how many do you have left?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    grade: 1,
    level: "easy",
  },
  {
    question: "What number comes after 19?",
    options: ["18", "20", "21", "22"],
    answer: "20",
    grade: 1,
    level: "easy",
  },

  // Grade 2
  {
    question: "What is 15 - 7?",
    options: ["6", "7", "8", "9"],
    answer: "8",
    grade: 2,
    level: "easy",
  },
  {
    question: "What is double of 12?",
    options: ["20", "22", "24", "26"],
    answer: "24",
    grade: 2,
    level: "easy",
  },
  {
    question: "How many minutes are in 1 hour?",
    options: ["30", "50", "60", "100"],
    answer: "60",
    grade: 2,
    level: "easy",
  },
  {
    question: "What is 20 + 35?",
    options: ["45", "50", "55", "65"],
    answer: "55",
    grade: 2,
    level: "easy",
  },

  // Grade 3
  {
    question: "What is 4 x 6?",
    options: ["20", "22", "24", "28"],
    answer: "24",
    grade: 3,
    level: "easy",
  },
  {
    question: "What number is missing: 3, 6, 9, _, 15?",
    options: ["10", "11", "12", "13"],
    answer: "12",
    grade: 3,
    level: "medium",
  },
  {
    question: "What is 30 ÷ 5?",
    options: ["4", "5", "6", "7"],
    answer: "6",
    grade: 3,
    level: "easy",
  },
  {
    question: "What is the perimeter of a square with side length 5 cm?",
    options: ["10 cm", "15 cm", "20 cm", "25 cm"],
    answer: "20 cm",
    grade: 3,
    level: "medium",
  },

  // Grade 4
  {
    question: "What is 12 x 5?",
    options: ["50", "55", "60", "65"],
    answer: "60",
    grade: 4,
    level: "easy",
  },
  {
    question: "Which fraction is equivalent to 1/2?",
    options: ["2/3", "2/4", "3/8", "4/6"],
    answer: "2/4",
    grade: 4,
    level: "medium",
  },
  {
    question: "What is the value of the underlined digit: 5,<u>4</u>78?",
    options: ["4", "40", "400", "4,000"],
    answer: "400",
    grade: 4,
    level: "easy",
  },
  {
    question: "A rectangle has length 8 cm and width 3 cm. What is its area?",
    options: ["11 sq cm", "22 sq cm", "24 sq cm", "32 sq cm"],
    answer: "24 sq cm",
    grade: 4,
    level: "medium",
  },

  // Grade 5
  {
    question: "What is 3/4 + 1/4?",
    options: ["1/2", "1", "4/8", "2/4"],
    answer: "1",
    grade: 5,
    level: "easy",
  },
  {
    question: "Solve: 5 + 2 x 3",
    options: ["21", "11", "15", "10"],
    answer: "11",
    grade: 5,
    level: "medium",
  },
  {
    question: "What is 1.5 x 4?",
    options: ["4.5", "5.0", "6.0", "7.5"],
    answer: "6.0",
    grade: 5,
    level: "medium",
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    answer: "6",
    grade: 5,
    level: "easy",
  },

  // Grade 6
  {
    question: "What is the ratio of circles to stars if there are 3 circles and 6 stars?",
    options: ["1:2", "2:1", "3:1", "1:3"],
    answer: "1:2",
    grade: 6,
    level: "easy",
  },
  {
    question: "If x + 5 = 12, what is the value of x?",
    options: ["5", "7", "8", "17"],
    answer: "7",
    grade: 6,
    level: "medium",
  },
  {
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    answer: "20",
    grade: 6,
    level: "medium",
  },
  {
    question: "What is the absolute value of -15?",
    options: ["-15", "0", "15", "1"],
    answer: "15",
    grade: 6,
    level: "easy",
  },

  // Grade 7
  {
    question: "Evaluate: 2x - 3 when x = 5",
    options: ["7", "10", "13", "15"],
    answer: "7",
    grade: 7,
    level: "medium",
  },
  {
    question: "What is the probability of rolling a 4 on a standard 6-sided die?",
    options: ["1/2", "1/4", "1/6", "4/6"],
    answer: "1/6",
    grade: 7,
    level: "medium",
  },
  {
    question: "If the radius of a circle is 7 cm, what is its circumference? (Use pi = 22/7)",
    options: ["22 cm", "44 cm", "154 cm", "88 cm"],
    answer: "44 cm",
    grade: 7,
    level: "hard",
  },
  {
    question: "Solve: -8 + (-12)",
    options: ["-20", "20", "-4", "4"],
    answer: "-20",
    grade: 7,
    level: "easy",
  },

  // Grade 8
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8",
    grade: 8,
    level: "easy",
  },
  {
    question: "Solve for y: 3y - 4 = 11",
    options: ["3", "4", "5", "6"],
    answer: "5",
    grade: 8,
    level: "medium",
  },
  {
    question: "In a right triangle, if the legs are 3 cm and 4 cm, what is the hypotenuse?",
    options: ["5 cm", "6 cm", "7 cm", "25 cm"],
    answer: "5 cm",
    grade: 8,
    level: "hard",
  },
  {
    question: "Evaluate: 2 to the power of 5 (2^5)",
    options: ["10", "16", "25", "32"],
    answer: "32",
    grade: 8,
    level: "medium",
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");
    
    // Clear existing questions
    await Question.deleteMany({});
    console.log("Deleted old questions.");
    
    // Insert new questions
    await Question.insertMany(questions);
    console.log("Successfully seeded questions for Grades 1-8.");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

seedDB();
