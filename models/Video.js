const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  title: { type: String, required: true },
  topicCode: { type: Number, required: true },
  topicPart: { type: String, required: true },
  signsTopic: { type: String, required: true },
  price: { type: Number, required: true },
  soldAmount: { type: Number, required: true },
  videoExUrl: {type: String },
  notes: { type: String }
});

module.exports = mongoose.model('Video', videoSchema);
