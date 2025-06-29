const Lessons = require('../models/lessons');
const getNextSequence = require('../utils/getNextSequence.js')

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
    const code = await getNextSequence("lessons");
    const newLesson = new Lessons({...req.body,code});
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLessonsByTopicCode = async (req, res) => {
  try {
    const topicCode = parseInt(req.params.topicCode);
    const lessons = await Lessons.find({ topicCode });
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};
exports.updateLesson = async (req, res) => {
  try {
    const { code } = req.params;
    const updatedLesson = await Lessons.findOneAndUpdate({ code: +code }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json(updatedLesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const { code } = req.params;
    const deletedLesson = await Lessons.findOneAndDelete({code});

    if (!deletedLesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ message: 'Lesson deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting lesson' });
  }
};
