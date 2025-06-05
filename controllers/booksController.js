const Books = require('../models/Books.js');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};

exports.addBook = async (req, res) => {
  try {
    const newBooks = new Books(req.body);
    await newBooks.save();
    res.status(201).json(newBooks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBooksByTopicCode = async (req, res) => {
  try {
    const topicCode = parseInt(req.params.topicCode);
    const books = await Books.find({ topicCode });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};
