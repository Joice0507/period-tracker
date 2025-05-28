// backend/models/UserPeriod.js
const mongoose = require('mongoose');

const UserPeriodSchema = new mongoose.Schema({
  lastPeriodDate: String,
  cycleLength: Number,
  periodDuration: Number,
});

module.exports = mongoose.model('UserPeriod', UserPeriodSchema);
