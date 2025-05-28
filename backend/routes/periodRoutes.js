// backend/routes/periodRoutes.js
const express = require('express');
const router = express.Router();
const UserPeriod = require('../models/UserPeriod');

router.post('/', async (req, res) => {
  try {
    const { lastPeriodDate, cycleLength, periodDuration } = req.body;

    // Save to DB (optional)
    const data = new UserPeriod({ lastPeriodDate, cycleLength, periodDuration });
    await data.save();

    // Predict next period and fertile window
    const lastDate = new Date(lastPeriodDate);
    const nextPeriod = new Date(lastDate);
    nextPeriod.setDate(lastDate.getDate() + parseInt(cycleLength));

    const ovulation = new Date(lastDate);
    ovulation.setDate(lastDate.getDate() + parseInt(cycleLength) - 14);

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(ovulation.getDate() - 5);
    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(ovulation.getDate() + 1);

    res.json({
      nextPeriod: nextPeriod.toDateString(),
      fertileWindow: `${fertileStart.toDateString()} to ${fertileEnd.toDateString()}`
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
