const express = require('express');
const router = express.Router();
const testsController = require('../controllers/testsController');

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
router.get('/', testsController.getAllTests);

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
router.post('/', testsController.addTest);

module.exports = router;
