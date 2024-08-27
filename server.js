
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mongo URI
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model for storing user data
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Route to register a new user
app.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to authenticate user and return JWT
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.password !== password) return res.status(400).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const dataUsageSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  usage: Number,  // MB or GB used
  date: Date,
});

const breachReportSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  details: String,
  date: Date,
});

const appUsageSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  appName: String,
  usage: Number,  // time in minutes or data used
  date: Date,
});


// Define a port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
