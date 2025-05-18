const mongoose = require('mongoose');

const studentLessonsSchema = new mongoose.Schema({
  studentCode: { type: Number, required: true },
  lessonCode: { type: Number, required: true }
});

module.exports = mongoose.model('StudentLessons', studentLessonsSchema, 'studentLessons');