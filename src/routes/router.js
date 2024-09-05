const express = require('express');
const router = express.Router();

// Endpoint to get data usage over time
router.get('/data-usage', async (req, res) => {
  const { userId } = req;  // Ensure authentication is handled to get userId
  try {
    const usageStats = await DataUsage.find({ userId }).sort({ date: -1 });
    res.json(usageStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get data breach reports
router.get('/data-breaches', async (req, res) => {
  const { userId } = req;
  try {
    const breachReports = await BreachReport.find({ userId }).sort({ date: -1 });
    res.json(breachReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get app usage distribution
router.get('/app-usage', async (req, res) => {
  const { userId } = req;
  try {
    const appsUsage = await AppUsage.find({ userId }).sort({ date: -1 });
    res.json(appsUsage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/aggregate-data-usage', async (req, res) => {
    const { userId } = req;
    try {
      const monthlyUsage = await DataUsage.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        { $group: {
          _id: { $month: '$date' },
          totalUsage: { $sum: '$usage' },
        }}
      ]);
      res.json(monthlyUsage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
