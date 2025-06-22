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
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the customer
 *               phone:
 *                 type: string
 *               orderCode:
 *                 type: number
 *               studentCode:
 *                 type: number
 *               status:
 *                 type: string
 *               fullName:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   street:
 *                     type: string
 *                 required:
 *                   - city
 *                   - street
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookCode:
 *                       type: string
 *                     videoCode:
 *                       type: number
 *                     size:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *                   required:
 *                     - price
 *                     - quantity
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', ordersController.addOrder);
/**
 * @swagger
 * /orders/{orderCode}:
 *   delete:
 *     summary: Delete an order by orderCode
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderCode
 *         required: true
 *         description: Order orderCode
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 */
router.delete('/:orderCode', ordersController.deleteOrder);

/**
 * @swagger
 * /orders/{orderCode}:
 *   put:
 *     summary: Update an order by orderCode
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderCode
 *         required: true
 *         description: Order orderCode
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
 *         description: Updated order
 */
router.put('/:orderCode', ordersController.updateOrder);


module.exports = router;
