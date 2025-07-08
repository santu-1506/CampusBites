const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config({ path: './config/config.env' });

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Token expired', 
          code: 'TOKEN_EXPIRED',
          expiredAt: error.expiredAt 
        });
      }
      return res.status(401).json({ 
        message: 'Not authorized, token failed',
        code: 'TOKEN_INVALID'
      });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
