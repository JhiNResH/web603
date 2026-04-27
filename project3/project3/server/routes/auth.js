const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const connectDB = require('../config/db');
const memoryStore = require('../utils/memoryStore');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const jwtSecret = () => process.env.JWT_SECRET || 'taskflow_demo_jwt_secret';

// @route  POST /api/auth/signup
// @desc   Register a new user
// @access Public
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    if (connectDB.isUsingMemoryStore()) {
      let user = memoryStore.findUserByEmail(email);
      if (user) return res.status(400).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = memoryStore.createUser({ name, email, password: hashedPassword });

      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, jwtSecret(), { expiresIn: '7d' });

      res.cookie('token', token, COOKIE_OPTIONS);
      req.session.userId = user._id;

      return res.status(201).json({ user: memoryStore.publicUser(user) });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwtSecret(), { expiresIn: '7d' });

    res.cookie('token', token, COOKIE_OPTIONS);
    req.session.userId = user.id;

    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route  POST /api/auth/login
// @desc   Login user
// @access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (connectDB.isUsingMemoryStore()) {
      const user = memoryStore.findUserByEmail(email);
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, jwtSecret(), { expiresIn: '7d' });

      res.cookie('token', token, COOKIE_OPTIONS);
      req.session.userId = user._id;

      return res.json({ user: memoryStore.publicUser(user) });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwtSecret(), { expiresIn: '7d' });

    res.cookie('token', token, COOKIE_OPTIONS);
    req.session.userId = user.id;

    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route  POST /api/auth/logout
// @desc   Logout user — clear cookie and session
// @access Private
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

// @route  GET /api/auth/me
// @desc   Get logged-in user info
// @access Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    if (connectDB.isUsingMemoryStore()) {
      const user = memoryStore.findUserById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(memoryStore.publicUser(user));
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
