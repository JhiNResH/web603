const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');
const connectDB = require('../config/db');
const memoryStore = require('../utils/memoryStore');

// Protect all task routes
router.use(authMiddleware);

// @route  GET /api/tasks
// @desc   Get all tasks for the logged-in user
router.get('/', async (req, res) => {
  try {
    if (connectDB.isUsingMemoryStore()) {
      return res.json(memoryStore.listTasks(req.user.id));
    }

    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route  POST /api/tasks
// @desc   Create a new task
router.post('/', async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    if (connectDB.isUsingMemoryStore()) {
      const task = memoryStore.createTask({
        userId: req.user.id,
        title: title.trim(),
        description: description ? description.trim() : '',
        priority: priority || 'medium'
      });
      return res.status(201).json(task);
    }

    const task = new Task({
      user: req.user.id,
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium'
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route  PUT /api/tasks/:id
// @desc   Update a task
router.put('/:id', async (req, res) => {
  try {
    if (connectDB.isUsingMemoryStore()) {
      let task = memoryStore.findTaskById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      if (task.user !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      task = memoryStore.updateTask(req.params.id, req.body);
      return res.json(task);
    }

    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route  DELETE /api/tasks/:id
// @desc   Delete a task
router.delete('/:id', async (req, res) => {
  try {
    if (connectDB.isUsingMemoryStore()) {
      const task = memoryStore.findTaskById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      if (task.user !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      memoryStore.deleteTask(req.params.id);
      return res.json({ message: 'Task removed' });
    }

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
