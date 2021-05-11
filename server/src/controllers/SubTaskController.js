const SubTask = require('../models/subtask');
const Todo = require('../models/todo');

exports.getSubTasks = async (req, res) => {
  try {
    const subtasks = await SubTask.find({ todo: req.params.id });
    res.send({ data: subtasks });
  } catch (e) {
    res.status(500).send(e.messages);
  }
};

exports.createSubTask = async (req, res) => {
  try {
    //find if correct todo
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).send({
        error: 'Todo not found',
      });
    }

    const subtask = new SubTask({
      ...req.body,
      todo: todo._id,
    });
    await subtask.save();
    todo.subtasks.push(subtask._id);
    await todo.save();
    res.send(subtask);
  } catch (e) {
    res.status(500).send(e.messages);
  }
};

exports.showSubTask = async (req, res) => {
  try {
    const subtask = await SubTask.findById(req.params.task);
    if (!subtask) {
      res.status(404).send({
        error: 'Sub Task not found',
      });
    }
  } catch (e) {
    res.status(500).send(e.messages);
  }
};

exports.deleteSubTask = async (req, res) => {
  try {
    const subtask = await SubTask.findById(req.params.task);
    await subtask.delete();
    res.send({
      message: 'Sub Task is removed',
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateSubTask = async (req, res) => {
  try {
    const subtask = await SubTask.findById(req.params.id);
    subtask.status = req.body.status;
    await subtask.save();
    res.send(subtask);
  } catch (e) {
    res.status(500).send(e);
  }
};
