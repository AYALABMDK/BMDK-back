const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    testsList: { type: [mongoose.Schema.Types.Mixed], default: [] },
    notes: { type: String, default: '' }
});

module.exports = mongoose.model('Students', studentsSchema);