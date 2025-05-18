const express = require('express');
const router = express.Router();
const Books = require('../models/Books.js');

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
router.get('/', async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new books
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
router.post('/', async (req, res) => {
  try {
    const newBooks = new Books(req.body);
    await newBooks.save();
    res.status(201).json(newBooks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;