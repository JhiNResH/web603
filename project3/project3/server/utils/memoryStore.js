const crypto = require('crypto');

const users = [];
const tasks = [];

function createId() {
  return crypto.randomBytes(12).toString('hex');
}

function publicUser(user) {
  return {
    id: user._id,
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
}

function findUserByEmail(email) {
  return users.find(user => user.email === String(email).toLowerCase());
}

function findUserById(id) {
  return users.find(user => user._id === id);
}

function createUser({ name, email, password }) {
  const user = {
    _id: createId(),
    name,
    email: String(email).toLowerCase(),
    password,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  return user;
}

function listTasks(userId) {
  return tasks
    .filter(task => task.user === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function createTask({ userId, title, description, priority }) {
  const task = {
    _id: createId(),
    user: userId,
    title,
    description,
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.unshift(task);
  return task;
}

function findTaskById(id) {
  return tasks.find(task => task._id === id);
}

function updateTask(id, updates) {
  const task = findTaskById(id);
  if (!task) return null;

  Object.assign(task, {
    ...updates,
    _id: task._id,
    user: task.user,
    createdAt: task.createdAt
  });

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex(task => task._id === id);
  if (index === -1) return null;
  return tasks.splice(index, 1)[0];
}

module.exports = {
  createTask,
  createUser,
  deleteTask,
  findTaskById,
  findUserByEmail,
  findUserById,
  listTasks,
  publicUser,
  updateTask
};
