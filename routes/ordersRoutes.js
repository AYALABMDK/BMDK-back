const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get('/', ordersController.getAllOrders);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Orders'
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', ordersController.addOrder);

module.exports = router;
