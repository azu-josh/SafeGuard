const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path as necessary

const router = express.Router();

// Route to set up a PIN
router.post('/setup-pin', async (req, res) => {
  const { userId, pin } = req.body;

  try {
    const encryptedPin = await bcrypt.hash(pin, 10);

    // Find the user and update their pin
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.pin = encryptedPin;
    await user.save();

    res.status(200).json({ success: true, message: 'PIN set up successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Route to verify the PIN
router.post('/verify-pin', async (req, res) => {
  const { userId, pin } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect PIN' });

    res.status(200).json({ success: true, message: 'PIN verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
