const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

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
router.get("/", ordersController.getAllOrders);

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
router.post("/", ordersController.addOrder);

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
router.delete("/:orderCode", ordersController.deleteOrder);

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
router.put("/:orderCode", ordersController.updateOrder);

/**
 * @swagger
 * /orders/confirm/{orderCode}:
 *   get:
 *     summary: Confirm order as delivered
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderCode
 *         required: true
 *         description: Order code to confirm delivery
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Confirmation result and user name
 *       404:
 *         description: Order not found
 */
router.get("/confirm/:orderCode", ordersController.confirmReceivedPage);

/**
 * @swagger
 * /orders/send-custom-email:
 *   post:
 *     summary: Send a custom email to a customer
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - to
 *               - subject
 *               - message
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Failed to send email
 */
router.post("/send-custom-email", ordersController.sendCustomEmail);

module.exports = router;
