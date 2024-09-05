const mongoose = require('mongoose');

const AdBlockSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('AdBlock', AdBlockSchema);
