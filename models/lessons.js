const mongoose = require('mongoose');

const lessonsSchema = new mongoose.Schema({
  code: String,
  topicCode: String,
  description: String,
  city: String,
  day: String,
  hour: String,
  status: String,
  studentsCount: Number,
  studentsType: String,
  price: Number,
  startDate: Date,
  endDate: Date,
  notes: String
}, {
  collection: 'lessons',
  timestamps: true
});

module.exports = mongoose.model('Lessons', lessonsSchema);
