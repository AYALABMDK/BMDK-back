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

/**
 * @swagger
 * /lessons/{topicCode}:
 *   get:
 *     summary: Get lessons by topicCode
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: topicCode
 *         required: true
 *         schema:
 *           type: integer
 *         description: The topic code to filter lessons
 *     responses:
 *       200:
 *         description: List of lessons by topicCode
 *       500:
 *         description: Server error
 */
router.get('/:topicCode', lessonsController.getLessonsByTopicCode);

module.exports = router;
