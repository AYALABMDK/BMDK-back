const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const videoController = require('../controllers/videoController');

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
 * /videos/{topicCode}:
 *   get:
 *     summary: Get all videos by topic code
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: topicCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the topic
 *     responses:
 *       200:
 *         description: A list of videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Videos'
 *       500:      
 *        description: Server error
 */ 

router.get('/:topicCode', videoController.getVideosByTopicCode);


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
