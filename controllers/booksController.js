const Books = require('../models/Books.js');
const getNextSequence = require('../utils/getNextSequence.js')


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
    const code = await getNextSequence("books");
    const newBooks = new Books({ ...req.body, code });
    await newBooks.save();
    res.status(201).json(newBooks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { bookCode } = req.params;

    const deletedBook = await Books.findOneAndDelete({ code: Number(bookCode) });

    if (!deletedBook) {
      return res.status(404).json({ error: "הספר לא נמצא" });
    }

    res.json({ message: "הספר נמחק בהצלחה" });
  } catch (err) {
    console.error("שגיאה במחיקת הספר:", err.message);
    res.status(500).json({ error: "שגיאה במחיקת הספר" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { bookCode } = req.params;
    const updateData = req.body;

    const updatedBook = await Books.findOneAndUpdate({ code: Number(bookCode) }, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: "הספר לא נמצא" });
    }

    res.json(updatedBook);
  } catch (err) {
    console.error("שגיאה בעדכון הספר:", err.message);
    res.status(500).json({ error: "שגיאה בעדכון הספר" });
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
