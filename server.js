const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');  // Import auth routes
const userRoutes = require('./src/routes/user');  // Import user routes

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

// Routes
app.use('/auth', authRoutes);  // Use auth routes
app.use('/api/user', userRoutes); // Use user routes

// Define a port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
