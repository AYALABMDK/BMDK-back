const express = require('express');
const router = express.Router();
const StudentLessons = require('../models/StudentLessons.js');

/**
 * @swagger
 * tags:
 *   name: StudentLessons
 *   description: StudentLessons management
 */

/**
 * @swagger
 * /studentLessons:
 *   get:
 *     summary: Get all studentLessons
 *     tags: [StudentLessons]
 *     responses:
 *       200:
 *         description: List of all studentLessons
 */
router.get('/', async (req, res) => {
    try {
        const studentLessons = await StudentLessons.find();
        res.json(studentLessons);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching studentLessons' });
    }
});

/**
 * @swagger
 * /studentLessons:
 *   post:
 *     summary: Add a new studentLessons
 *     tags: [StudentLessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentLessons'
 *     responses:
 *       201:
 *         description: StudentLessons created
 */
router.post('/', async (req, res) => {
    try {
        const newStudentLessons = new StudentLessons(req.body);
        await newStudentLessons.save();
        res.status(201).json(newStudentLessons);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;