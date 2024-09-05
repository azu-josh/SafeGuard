const express = require('express');
const router = express.Router();
const AdBlock = require('../models/AdBlock');
const AdBlockerController = require('../controllers/AdBlockerController');

// Get all blocked URLs
router.get('/', async (req, res) => {
  try {
    const urls = await AdBlock.find({});
    res.json(urls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new URL to block
router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  try {
    const newUrl = new AdBlock({ url });
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a URL
router.delete('/:id', async (req, res) => {
  try {
    const removedUrl = await AdBlock.findByIdAndDelete(req.params.id);
    if (!removedUrl) return res.status(404).json({ message: 'URL not found' });
    res.json({ message: 'URL deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', AdBlockerController.addUrlToBlockList);
router.delete('/remove', AdBlockerController.removeUrlFromBlockList);
router.get('/list', AdBlockerController.getBlockList);

module.exports = router;
