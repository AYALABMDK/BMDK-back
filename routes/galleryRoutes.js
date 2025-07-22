const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {
  uploadImage,
  deleteImage,
  getImages
} = require('../controllers/galleryController');

/**
 * @swagger
 * /gallery/images:
 *   get:
 *     summary: שליפת כל התמונות מהשרת
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: רשימת התמונות הוחזרה בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       public_id:
 *                         type: string
 *       500:
 *         description: שגיאה בשליפת התמונות
 */
router.get('/', getImages);

/**
 * @swagger
 * /gallery/upload:
 *   post:
 *     summary: העלאת תמונה ל-Cloudinary
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: התמונה הועלתה בהצלחה
 *       500:
 *         description: שגיאה בהעלאת תמונה
 */
router.post('/', upload.single('image'), uploadImage);

/**
 * @swagger
 * /gallery/images/{publicId}:
 *   delete:
 *     summary: מחיקת תמונה לפי publicId
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: מזהה ציבורי של התמונה למחיקה
 *     responses:
 *       200:
 *         description: התמונה נמחקה בהצלחה
 *       500:
 *         description: שגיאה במחיקת תמונה
 */
router.delete('/:publicId', deleteImage);


module.exports = router;
