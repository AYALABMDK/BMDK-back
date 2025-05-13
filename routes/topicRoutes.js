const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic.js');


// GET all topics
router.get('/', async (req, res) => {
    try {
        const topic = await Topic.find();
        res.json(topic);
        console.log(topic);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching topic' });
    }
});

// POST a new topic
router.post('/', async (req, res) => {
    try {
        const newTopic = new Topic(req.body);
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;