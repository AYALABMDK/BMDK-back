const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: ניהול תוכן של דפי האתר
 */

/**
 * @swagger
 * /pages/{key}:
 *   get:
 *     summary: שליפת תוכן של דף לפי key
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         description: מזהה ייחודי לדף (למשל "about")
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: דף נשלף בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 *                 title:
 *                   type: string
 *                 subtitle:
 *                   type: string
 *                 description:
 *                   type: string
 *                 teacherTitle:
 *                   type: string
 *                 teamMembers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       role:
 *                         type: string
 *                       avatar:
 *                         type: string
 *                       description:
 *                         type: string
 *       404:
 *         description: הדף לא נמצא
 */
router.get("/:key", pagesController.getPageByKey);

/**
 * @swagger
 * /pages/{key}:
 *   put:
 *     summary: עדכון תוכן של דף לפי key
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         description: מזהה ייחודי לדף (למשל "about")
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               description:
 *                 type: string
 *               teacherTitle:
 *                 type: string
 *               teamMembers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                     description:
 *                       type: string
 *     responses:
 *       200:
 *         description: הדף עודכן בהצלחה
 *       404:
 *         description: הדף לא נמצא
 *       500:
 *         description: שגיאה בעדכון
 */
router.put("/:key", pagesController.updatePage);

module.exports = router;
