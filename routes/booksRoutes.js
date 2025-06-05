const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController.js');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books management
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 */
router.get('/', booksController.getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       201:
 *         description: Book created
 */
router.post('/', booksController.addBook);

/**
 * @swagger
 * /books/{topicCode}:
 *   get:
 *     summary: Get books by topicCode
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: topicCode
 *         required: true
 *         schema:
 *           type: integer
 *         description: The topic code to filter books
 *     responses:
 *       200:
 *         description: List of books by topicCode
 *       500:
 *         description: Server error
 */
router.get('/:topicCode', booksController.getBooksByTopicCode);

module.exports = router;
