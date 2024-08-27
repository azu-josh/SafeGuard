const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');
const User = require('../models/user');

// AWS S3 Configuration
const s3 = new AWS.S3();

// Function to create an S3 bucket for a new user
async function createUserBucket(username) {
    const bucketName = `user-${username}-${Date.now()}`;
    const params = {
        Bucket: bucketName,
        ACL: 'private'  // Set the access level for the bucket
    };
    try {
        await s3.createBucket(params).promise();
        console.log(`Bucket created successfully: ${bucketName}`);
        return bucketName;
    } catch (error) {
        console.error('Error creating bucket:', error);
        throw error;
    }
}

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
    // Check if user already exists
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username already taken', 
        suggestedUsername: suggestUsername(username) 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save user to the database
    await user.save();

    // Create S3 bucket for the user
    const bucketName = await createUserBucket(username);

    // Optionally, save the bucket name to the user's record
    user.bucketName = bucketName;
    await user.save();

    res.status(201).json({ message: 'User registered successfully', bucket: bucketName });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
