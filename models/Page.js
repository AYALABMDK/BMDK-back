const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  title: String,
  subtitle: String,
  description: String,
  teacherTitle: String,
  teamMembers: [
    {
      name: String,
      role: String,
      avatar: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Page", PageSchema);
