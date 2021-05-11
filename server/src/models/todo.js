const mongoose = require('mongoose');
const SubTask = require('./subtask');

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'subtasks',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Delete sub tasks when todo is removed
TodoSchema.pre('remove', async function (next) {
  const todo = this;
  await SubTask.deleteMany({ todo: todo._id });

  next();
});

const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;
