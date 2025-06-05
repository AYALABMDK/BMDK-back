const express = require('express');
const router = express.Router();
const lessonsController = require('../controllers/lessonsController');

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
router.get('/', lessonsController.getAllLessons);

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
router.post('/', lessonsController.addLesson);

module.exports = router;
