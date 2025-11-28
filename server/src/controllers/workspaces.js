const Workspace = require('../models/Workspace');
const Project = require('../models/Project');

exports.list = async (req,res)=>{
  const w = await Workspace.find({ 'members.userId': req.user.id }).populate('projects');
  res.json({ success:true, data: w });
};

exports.get = async (req,res)=>{
  const w = await Workspace.findById(req.params.id).populate('projects').populate('members.userId','name email');
  if(!w) return res.status(404).json({ success:false, message:'Workspace not found' });
  res.json({ success:true, data: w });
};

exports.create = async (req,res)=>{
  const { name, description } = req.body;
  const ws = await Workspace.create({ name, description, members: [{ userId: req.user.id, role:'ADMIN' }] });
  res.status(201).json({ success:true, data: ws });
};

exports.update = async (req,res)=>{
  const ws = await Workspace.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json({ success:true, data: ws });
};

exports.remove = async (req,res)=>{
  await Project.deleteMany({ workspace: req.params.id });
  await Workspace.findByIdAndDelete(req.params.id);
  res.json({ success:true });
};
