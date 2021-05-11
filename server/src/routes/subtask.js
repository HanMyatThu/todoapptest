const express = require('express');
const router = express.Router();
const SubTaskController = require('../controllers/SubTaskController');
const SubTask = require('../models/subtask');

// id => todo id
router.get('/todos/:id/tasks', SubTaskController.getSubTasks);

router.post('/todos/:id/tasks', SubTaskController.createSubTask);

router.get('/todos/:id/tasks/:task', SubTaskController.showSubTask);

router.patch('/todos/:id/tasks/:task', SubTaskController.updateSubTask);

router.delete('/todos/:id/tasks/:task', SubTaskController.deleteSubTask);

module.exports = router;
