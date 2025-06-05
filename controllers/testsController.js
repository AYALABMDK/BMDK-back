const Tests = require('../models/Tests');

exports.getAllTests = async (req, res) => {
  try {
    const tests = await Tests.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tests' });
  }
};

exports.addTest = async (req, res) => {
  try {
    const newTest = new Tests(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
