const StudentLessons = require('../models/StudentLessons');

exports.getAllStudentLessons = async (req, res) => {
  try {
    const studentLessons = await StudentLessons.find();
    res.json(studentLessons);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching studentLessons' });
  }
};

exports.addStudentLesson = async (req, res) => {
  try {
    const newStudentLessons = new StudentLessons(req.body);
    await newStudentLessons.save();
    res.status(201).json(newStudentLessons);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
