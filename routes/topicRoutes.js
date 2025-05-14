const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic.js');

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
router.get('/', async (req, res) => {
  try {
    const topic = await Topic.find();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching topics' });
  }
});

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
router.post('/', async (req, res) => {
  try {
    const newTopic = new Topic(req.body);
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
