const Video = require('../models/Video');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVideosByTopicCode = async (req, res) => {
  try {
    const { topicCode } = req.params;
    const videos = await Video.find({ topicCode });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addVideo = async (req, res) => {
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
};

