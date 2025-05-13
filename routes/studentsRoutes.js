const express = require('express');
const router = express.Router();
const Students = require('../models/Students.js');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// POST a new Student
router.post('/', async (req, res) => {
  try {
    const newStudents = new Students(req.body);
    await newStudents.save();
    res.status(201).json(newStudents);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;