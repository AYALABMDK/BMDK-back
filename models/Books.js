const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  topicCode: { type: Number, required: true },
  signs: { type: String, required: true },
  signsTopic: { type: String, required: true },
  bigBooksQuantity: { type: Number },
  smallBooksQuantity: { type: Number },
  bigBooksSold: { type: Number },
  smallBooksSold: { type: Number },
  bigBookPrice: { type: Number },
  smallBookPrice: { type: Number },
  notes: { type: String }
});

module.exports = mongoose.model('Books', booksSchema);