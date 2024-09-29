const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
        console.log(err);
      }
      req.userId = decoded.id;
      next();
    });
  };

module.exports = verifyToken;