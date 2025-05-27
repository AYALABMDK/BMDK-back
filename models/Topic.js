const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: String,
    notes: String
});

module.exports = mongoose.model('Topic', topicSchema, 'topic');