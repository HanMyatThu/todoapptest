const SubTask = require('../models/subtask');
const Todo = require('../models/todo');

exports.getAllTodo = async (req, res) => {
  try {
    let todos = await Todo.find().populate('subtasks');
    res.send({ data: todos });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.createTodo = async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    res.send(todo);
  } catch (e) {
    res.status(500).send(e.errors);
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById({ _id: req.params.id })
      .populate('subtasks')
      .exec();
    if (!todo) {
      res.status(404).send({
        error: 'Todo not found',
      });
    }
    res.send(todo);
  } catch (e) {
    res.status(500).send(e.errors);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.status = req.body.status;
    await todo.save();

    //update his subtasks to be completed
    //this action allows only when todo is set to complete
    if (req.body.status === true) {
      todo.subtasks.forEach(async (subtask) => {
        const task = await SubTask.findById(subtask._id);
        task.status = true;
        await task.save();
      });
    }
    res.send(todo);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete(req.params.id);
    res.send({
      message: 'Todo is deleted',
    });
  } catch (e) {
    res.status(500).send(e.errors);
  }
};
