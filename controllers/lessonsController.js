const Lessons = require('../models/lessons');

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lessons.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching lessons' });
  }
};

exports.addLesson = async (req, res) => {
  try {
    const newLesson = new Lessons(req.body);
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
