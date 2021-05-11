const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

router.get('/todos', TodoController.getAllTodo);

router.post('/todos', TodoController.createTodo);

router.get('/todos/:id', TodoController.getTodoById);

router.delete('/todos/:id', TodoController.deleteTodo);

router.patch('/todos/:id', TodoController.updateTodo);

module.exports = router;
