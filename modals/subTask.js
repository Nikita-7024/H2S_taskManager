const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema({
  subject: String,
  deadline: Date,
  status: String,
  isDeleted: { type: Boolean, default: false }
});

module.exports = SubtaskSchema;
