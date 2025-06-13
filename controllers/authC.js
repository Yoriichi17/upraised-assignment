const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Auth } = require('../models');
require('dotenv').config();

const JWT_EXPIRY = '10d'; 

// Register Controller
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'Username and password are required' });

    const userExists = await Auth.findOne({ where: { username } });
    if (userExists)
      return res.status(400).json({ error: 'Username already exists' });

    const newUser = await Auth.create({ username, password });

    return res.status(201).json({
      message: 'Registration successful',
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (err) {
    console.error('Registration Error:', err.message);
    return res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'Username and password are required' });

    const user = await Auth.findOne({ where: { username } });
    if (!user)
      return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: 'Invalid credentials' });

    
    const payload = {
      id: user.id,
      username: user.username,
    };
    // Generate JWT with expiry
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login Error:', err.message);
    return res.status(500).json({ error: 'Server error during login' });
  }
};
