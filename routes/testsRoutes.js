const express = require('express');
const router = express.Router();
const Tests = require('../models/Tests.js');

/**
 * @swagger
 * tags:
 *   name: Tests
 *   description: Tests management
 */

/**
 * @swagger
 * /tests:
 *   get:
 *     summary: Get all tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: List of all tests
 */
router.get('/', async (req, res) => {
  try {
    const tests = await Tests.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tests' });
  }
});

/**
 * @swagger
 * /tests:
 *   post:
 *     summary: Add a new test
 *     tags: [Tests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tests'
 *     responses:
 *       201:
 *         description: Test created
 */
router.post('/', async (req, res) => {
  try {
    const newTest = new Tests(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;