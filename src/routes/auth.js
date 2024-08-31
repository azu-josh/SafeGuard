const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: UUIDv4 } = require('uuid');
const User = require('../models/User');  // User model
const UserVerification = require('../models/UserVerification');  // User verification model
const PasswordReset = require('../models/PasswordReset');  // Password reset model
require('dotenv').config();

// Regular expressions for validation
const usernameRegex = /^(?!.*[-_]{2,})(?!.*[-_]$)[a-zA-Z0-9-_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;

// Function to suggest a username if the original is taken
const suggestUsername = async (username) => {
  const suggestion = username + Math.floor(Math.random() * 1000);
  const existingUser = await User.findOne({ username: suggestion });
  return existingUser ? await suggestUsername(username) : suggestion;
};

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
});

// Verify Nodemailer Setup
transporter.verify((error, success) => {
  if (error) {
    console.error('Mailer verification failed:', error);
  } else {
    console.log('Mailer is ready to send messages:', success);
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate username, email, and password
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Invalid username' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be 8-30 characters long and contain at least one uppercase letter and one number.' });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const suggestedUsername = await suggestUsername(username);
      return res.status(400).json({
        message: 'Email already taken',
        suggestedUsername
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const user = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });
    await user.save();

    // Generate and save the email verification token
    const verificationToken = UUIDv4();
    const verificationRecord = new UserVerification({
      userId: user._id,
      uniqueString: verificationToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 // 1 hour expiry
    });
    await verificationRecord.save();

    // Send the verification email
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: 'Verify Your Email',
      html: `<p>Hi ${user.username},</p>
             <p>Click the following link to verify your email:</p>
             <a href="http://${req.headers.host}/auth/verify-email?token=${verificationToken}">Verify Email</a>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending verification email:', err);
        return res.status(500).json({ message: 'An error occurred while sending verification email' });
      }
      console.log('Verification email sent:', info.response);
      res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
    });

  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify email route
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    const verificationRecord = await UserVerification.findOne({ uniqueString: token });

    if (!verificationRecord) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    const user = await User.findById(verificationRecord.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.verified = true;
    await user.save();
    await UserVerification.deleteOne({ _id: verificationRecord._id });

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });

  } catch (err) {
    console.error('Error during email verification:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Password Reset Request
router.post('/requestPasswordReset', async (req, res) => {
  const { email, redirectUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No account with this email' });
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'Email not verified yet. Check your inbox.' });
    }

    const resetToken = UUIDv4() + user._id;

    // Clear existing password reset records
    await PasswordReset.deleteMany({ userId: user._id });

    // Save new reset token with a 5-minute expiration
    const passwordResetRecord = new PasswordReset({
      userId: user._id,
      token: resetToken,
      createdAt: Date.now(),
    });
    await passwordResetRecord.save();

    // Send password reset email
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>Hi ${user.username},</p>
             <p>You requested a password reset. Click the following link to reset your password:</p>
             <a href="${redirectUrl}/reset-password?token=${resetToken}">Reset Password</a>
             <p>This link will expire in 5 minutes.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending password reset email:', err);
        return res.status(500).json({ message: 'An error occurred while sending the reset email' });
      }
      console.log('Password reset email sent:', info.response);
      res.status(200).json({ message: 'Password reset email sent' });
    });

  } catch (err) {
    console.error('Error during password reset request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify and Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the reset token in the database
    const passwordResetRecord = await PasswordReset.findOne({ token });

    // If the token does not exist or is expired, return an error
    if (!passwordResetRecord) {
      return res.status(400).json({ message: 'Invalid or expired password reset token' });
    }

    // Find the associated user
    const user = await User.findById(passwordResetRecord.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate new password against policy
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: 'New password does not meet the required criteria.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Log the hashed password for debugging
    console.log('New hashed password:', hashedPassword);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the password reset record from the database
    await PasswordReset.deleteOne({ _id: passwordResetRecord._id });

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (err) {
    console.error('Error during password reset:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route with detailed logging
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Log incoming request data
    console.log('Login request received:', req.body);

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return res.status(400).json({ message: 'User not found' });
        }

        const hash = user.password; // Stored hashed password
        const passwordEntered = req.body.password; // User-entered password
    
        console.log([hash, passwordEntered]); // Logging for debugging
    
        // Compare the entered password with the stored hashed password
        if (bcrypt.compareSync(passwordEntered, hash)) {
          console.log('Passwords match');
          res.json({ message: 'Login successful' });
        } else {
          console.log('Invalid password');
          return res.status(400).json({ message: 'Invalid password' });
        }

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// Middleware to check and extract user from token (Assuming you have JWT setup)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to get the username
router.get('/getUsername', authenticateToken, async (req, res) => {
  try {
    // Find the user by their ID, which is decoded from the token
    const userId = req.user._id;
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
// Change Password Route with Logging
router.post('/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  console.log(`Change password request for user ID: ${userId}`);

  try {
      // Find the user by their ID
      const user = await User.findById(userId);
      if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'User not found' });
      }

      // Compare the current password with the stored hashed password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
          console.log('Current password is incorrect');
          return res.status(400).json({ message: 'Current password is incorrect' });
      }

      console.log('Current password is correct');

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      console.log('Password updated successfully');

      res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
      console.error('Error changing password:', err.message);
      res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
