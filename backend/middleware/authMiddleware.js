const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    res.status(401).json({ message: 'Token invalid' });
  }
}

module.exports = authMiddleware;
