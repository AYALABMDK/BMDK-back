require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.verifyAdmin = (req, res, next) => {
  const token = req.cookies?.adminToken;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
