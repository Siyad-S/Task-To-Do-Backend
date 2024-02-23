const mongoose = require("mongoose");

const toDoSchema = mongoose.Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
    enum: ["urgent", "important", "optional"],
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
  }
});

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;
