const mongoose = require('mongoose');

const SubTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    todo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'todos',
    },
  },
  {
    timestamps: true,
  }
);

const SubTask = mongoose.model('subtasks', SubTaskSchema);

module.exports = SubTask;
