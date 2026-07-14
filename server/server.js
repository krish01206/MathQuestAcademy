const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require(
  "./routes/questionRoutes"
);

const scoreRoutes = require(
  "./routes/scoreRoutes"
);

const adminRoutes = require(
  "./routes/adminRoutes"
);

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/questions",
  questionRoutes
);

app.use(
  "/api/scores",
  scoreRoutes
);

app.get("/", (req, res) => {
  res.send("MathQuest Academy API Running ✅");
});

app.use(
  "/api/admin",
  adminRoutes
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });