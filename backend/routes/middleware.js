const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
module.exports = {
  authRequired: (req,res,next) => {
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({ error: 'No token' });
    const token = auth.split(' ')[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch(e) { return res.status(401).json({ error: 'Invalid token' }); }
  },
  allowRoles: (...roles) => (req,res,next) => {
    if(!req.user) return res.status(401).json({ error: 'No user' });
    if(!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  }
};
