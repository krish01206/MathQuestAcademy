const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, grade } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      grade,
      role: email.toLowerCase().includes("admin") ? "admin" : "student"
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      grade: user.grade,
      xp: user.xp,
      badges: user.badges,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        grade: user.grade,
        badges: user.badges,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    res.status(401).json({
      message: "Invalid Email or Password",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.profile = async (req, res) => {
  res.json(req.user);
};