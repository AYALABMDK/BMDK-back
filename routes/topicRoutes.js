const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController');

/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: Topic management
 */

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: List of all topics
 */
router.get('/', topicsController.getAllTopics);

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Add a new topic
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Topic'
 *     responses:
 *       201:
 *         description: Topic created
 */
router.post('/', topicsController.addTopic);

module.exports = router;
