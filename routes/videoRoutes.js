const express = require('express');
const router = express.Router();
const Video = require('../models/video');

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video management
 */


/**
 * @swagger
 * /videos:
 *   get:
 *     summary: get all videos
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: videos list
 */       




// קבלת כל הסרטונים
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/** 
 * @swagger
 * /videos:
 *   post:
 *     summary: add new video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Videos'
 *     responses:
 *       201:
 *         description: video added
 */

// הוספת סרטון חדש
router.post('/', async (req, res) => {
  const video = new Video({
    code: req.body.code,
    topicCode: req.body.topicCode,
    topicPart: req.body.topicPart,
    signsTopic: req.body.signsTopic,
    price: req.body.price,
    sold: req.body.sold,
    videoExUrl: req.body.videoExUrl,
    notes: req.body.notes
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
