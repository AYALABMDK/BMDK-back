const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management and authentication
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns JWT token
 *       401:
 *         description: Unauthorized
 */
router.post('/login', adminController.loginAdmin);

/**
 * @swagger
 * /admin/check:
 *   get:
 *     summary: Check if admin is logged in
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin is logged in
 *       401:
 *         description: Unauthorized
 */
router.get('/check', verifyAdmin, (req, res) => {
  res.status(200).json({ isAdmin: true });
});

/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production'
  });
  res.status(200).json({ message: 'Logged out' });
});

router.get('/auth-check', verifyAdmin, (req, res) => {
  res.status(200).json({ isAdmin: true });
});

module.exports = router;
