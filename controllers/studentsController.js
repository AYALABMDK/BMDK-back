const Students = require('../models/Students');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const newStudent = new Students(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
