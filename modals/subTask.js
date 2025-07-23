const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema({
  subject: String,
  deadline: Date,
  status: String,
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('sub_task', SubtaskSchema)
