// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/contactController");

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: שליחת הודעת אימייל
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: ההודעה נשלחה בהצלחה
 *       500:
 *         description: שגיאה בשליחת מייל
 */
router.post("/", sendEmail);

module.exports = router;
