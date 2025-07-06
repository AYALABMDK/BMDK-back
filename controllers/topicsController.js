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

exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deletedTopic = await Topic.findOneAndDelete({ id });
    console.log(deletedTopic);

    if (!deletedTopic) {
      return res.status(404).json({ error: "הנושא לא נמצא" });
    }

    res.json({ message: "הנושא נמחק בהצלחה" });
  } catch (err) {
    res.status(500).json({ error: "שגיאה במחיקת הנושא" });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTopic = await Topic.findOneAndUpdate({ id }, updateData, {
      new: true,
    });

    if (!updatedTopic) {
      return res.status(404).json({ error: "הנושא לא נמצא" });
    }

    res.json(updatedTopic);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בעדכון הנושא" });
  }
};