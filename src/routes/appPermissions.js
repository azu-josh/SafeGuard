const express = require('express');
const auth = require('../middleware/auth');
const App = require('../models/App');

const router = express.Router();

// Get user apps
router.get('/', auth, async (req, res) => {
  try {
    const apps = await App.find({ userId: req.user.id });
    res.json(apps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add new app
router.post('/', auth, async (req, res) => {
  const { appName, permissions } = req.body;
  try {
    const newApp = new App({
      userId: req.user.id,
      appName,
      permissions,
    });
    const app = await newApp.save();
    res.json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update app permissions
router.put('/:id', auth, async (req, res) => {
  const { permissions } = req.body;
  try {
    let app = await App.findById(req.params.id);
    if (!app) return res.status(404).json({ msg: 'App not found' });
    if (app.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    app.permissions = permissions;
    await app.save();
    res.json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
