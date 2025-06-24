const express = require('express');
const router = express.Router();
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
router.get('/', videoController.getAllVideos);

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
 *       500:
 *         description: Server error
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
router.post('/', videoController.addVideo);
/**
 * @swagger
 * /videos/{code}:
 *   delete:
 *     summary: Delete a video by code
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the video
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 */
router.delete('/:code', videoController.deleteVideo);

/**
 * @swagger
 * /videos/{code}:
 *   put:
 *     summary: Update a video by code
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the video to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Videos'
 *     responses:
 *       200:
 *         description: Updated video
 *       404:
 *         description: Video not found
 */
router.put('/:code', videoController.updateVideo);

module.exports = router;
