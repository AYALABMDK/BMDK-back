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

/**
 * @swagger
 * /topics:
 *   put:
 *     summary: Update a topic
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the topic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Topic'
 *     responses:
 *       201:
 *         description: Topic updated
 */
router.put('/:id', topicsController.updateTopic);

/**
 * @swagger
 * /topics:
 *   delete:
 *     summary: Delete a topic
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the topic
 *     responses:
 *       201:
 *         description: Topic deleted
 */
router.delete('/:id', topicsController.deleteTopic);

module.exports = router;
