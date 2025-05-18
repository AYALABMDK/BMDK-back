const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  topicCode: { type: Number, required: true },
  topicPart: { type: String, required: true },
  signsTopic: { type: String, required: true },
  price: { type: Number, required: true },
  sold: { type: Number, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Video', videoSchema);
