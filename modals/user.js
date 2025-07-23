const mongoose = require("mongoose");
const TaskSchema = require("./task");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  tasks: [TaskSchema]
});

module.exports = mongoose.model("User", UserSchema);
