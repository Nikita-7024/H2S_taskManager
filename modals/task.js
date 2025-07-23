const mongoose = require("mongoose");
const SubtaskSchema = require("./subTask");

const TaskSchema = new mongoose.Schema({
  subject: String,
  deadline: Date,
  status: String,
  isDeleted: { type: Boolean, default: false },
  subtasks: [SubtaskSchema]
});

module.exports = mongoose.model('task', TaskSchema)
