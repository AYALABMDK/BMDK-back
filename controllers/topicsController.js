const Topic = require('../models/Topic');
const getNextSequence = require('../utils/getNextSequence.js')

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching topics' });
  }
};

exports.addTopic = async (req, res) => {
  try {
    const id = await getNextSequence("topics");
    const newTopic = new Topic({ ...req.body, id });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
