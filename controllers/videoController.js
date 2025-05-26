const Video = require('../models/video');

exports.getVideosByTopicCode = async (req, res) => {
  try {
    const { topicCode } = req.params;
    const videos = await Video.find({ topicCode });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};