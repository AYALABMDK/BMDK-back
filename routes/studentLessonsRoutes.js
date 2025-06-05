const express = require('express');
const router = express.Router();
const studentLessonsController = require('../controllers/studentLessonsController');

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
router.get('/', studentLessonsController.getAllStudentLessons);

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
router.post('/', studentLessonsController.addStudentLesson);

module.exports = router;
