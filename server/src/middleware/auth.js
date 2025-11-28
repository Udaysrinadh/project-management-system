const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success:false, message:'No token' });
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    req.user = { id: payload.id, email: payload.email };
    next();
  }catch(err){
    return res.status(401).json({ success:false, message:'Invalid token' });
  }
};
