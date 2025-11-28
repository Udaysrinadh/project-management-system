const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = (user)=> jwt.sign({ id:user._id, email:user.email }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn:'7d' });

exports.register = async (req,res)=>{
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({ success:false, message:'email & password required' });
  const existing = await User.findOne({ email });
  if(existing) return res.status(400).json({ success:false, message:'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = signToken(user);
  res.status(201).json({ success:true, data: { user:{ id:user._id, name:user.name, email:user.email }, token } });
};

exports.login = async (req,res)=>{
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ success:false, message:'email & password required' });
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ success:false, message:'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(400).json({ success:false, message:'Invalid credentials' });
  const token = signToken(user);
  res.json({ success:true, data:{ user:{ id:user._id, name:user.name, email:user.email }, token } });
};

exports.me = async (req,res)=>{
  const user = await User.findById(req.user.id).select('-password');
  res.json({ success:true, data: user });
};
