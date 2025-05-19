const express = require('express');
const router = express.Router();
const Lessons = require('../models/lessons');

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lessons management
 */

/**
 * @swagger
 * /lessons:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: List of all lessons
 */
router.get('/', async (req, res) => {
  try {
    const lessons = await Lessons.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching lessons' });
  }
});

/**
 * @swagger
 * /lessons:
 *   post:
 *     summary: Add a new lesson
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lessons'
 *     responses:
 *       201:
 *         description: Lesson created successfully
 */
router.post('/', async (req, res) => {
  try {
    const newLesson = new Lessons(req.body);
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
