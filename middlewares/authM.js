const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Token format:Bearer token
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ error: 'Access denied. Token missing.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('Token Verification Failed:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
