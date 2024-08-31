const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model

// Route to get the username
router.get('/getUsername', async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userID is available through some authentication middleware
    const user = await User.findById(userId);
    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
