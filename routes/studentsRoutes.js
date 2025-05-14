const express = require('express');
const router = express.Router();
const Students = require('../models/Students.js');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 */
router.get('/', async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created
 */
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
