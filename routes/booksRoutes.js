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
 * /books/{bookCode}:
 *   delete:
 *     summary: Delete a book by bookCode
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookCode
 *         required: true
 *         description: Book bookCode
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.delete('/:bookCode', booksController.deleteBook);

/**
 * @swagger
 * /books/{bookCode}:
 *   put:
 *     summary: Update a book by bookCode
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookCode
 *         required: true
 *         description: Book bookCode
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update
 *     responses:
 *       200:
 *         description: Updated book
 */
router.put('/:bookCode', booksController.updateBook);

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
