const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  question: { type: String, required: true },
  answerList: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  score: { type: Number, required: true },
});

const testsSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  topicId: { type: Number, required: true },
  topicPart: { type: String },
  signs: { type: String, required: true },
  content: { type: [answerSchema], required: true },
});

module.exports = mongoose.model('Tests', testsSchema, 'tests');