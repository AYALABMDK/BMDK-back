const Video = require('../models/Video');
const getNextSequence = require('../utils/getNextSequence.js')

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
  try {
    const code = await getNextSequence("videos");
    const newVideo = new Video({ ...req.body, code });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteVideo = async (req, res) => {
  try {
    const { code } = req.params;
    const deletedVideo = await Video.findOneAndDelete({ code });

    if (!deletedVideo) {
      return res.status(404).json({ error: "הסרטון לא נמצא" });
    }

    res.json({ message: "הסרטון נמחק בהצלחה" });
  } catch (err) {
    res.status(500).json({ error: "שגיאה במחיקת הסרטון" });
  }
};
exports.updateVideo = async (req, res) => {
  try {
    const { code } = req.params;
    const updateData = req.body;

    const updatedVideo = await Video.findOneAndUpdate({ code }, updateData, {
      new: true,
    });

    if (!updatedVideo) {
      return res.status(404).json({ error: "הסרטון לא נמצא" });
    }

    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בעדכון הסרטון" });
  }
};

