const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const usernameRegex = /^(?!.*[-_]{2,})(?!.*[-_]$)[a-zA-Z0-9-_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;

const suggestUsername = (username) => {
  const randomNum = Math.floor(Math.random() * 1000);
  return `${username}${randomNum}`;
};

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!usernameRegex.test(username)) {
    return res.status(400).json({ message: 'Invalid username' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must be 8-30 characters long and contain at least one uppercase letter and one number.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username already taken', 
        suggestedUsername: suggestUsername(username) 
      });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Authenticate user and return JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
