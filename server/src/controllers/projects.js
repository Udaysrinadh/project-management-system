const Project = require('../models/Project');
const Workspace = require('../models/Workspace');

exports.list = async (req,res)=>{
  const projects = await Project.find({ 'members.userId': req.user.id }).populate('tasks');
  res.json({ success:true, data: projects });
};

exports.get = async (req,res)=>{
  const p = await Project.findById(req.params.id).populate('tasks').populate('members.userId','name email');
  if(!p) return res.status(404).json({ success:false, message:'Project not found' });
  res.json({ success:true, data: p });
};

exports.create = async (req,res)=>{
  const { title, description, workspaceId } = req.body;
  const project = await Project.create({ title, description, workspace: workspaceId, members:[{ userId: req.user.id, role:'ADMIN' }] });
  if(workspaceId){
    await Workspace.findByIdAndUpdate(workspaceId, { $push:{ projects: project._id } });
  }
  res.status(201).json({ success:true, data: project });
};

exports.update = async (req,res)=>{
  const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json({ success:true, data: p });
};

exports.remove = async (req,res)=>{
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success:true });
};
