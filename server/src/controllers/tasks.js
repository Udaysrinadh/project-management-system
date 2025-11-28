const Task = require('../models/Task');
const Project = require('../models/Project');

exports.listByProject = async (req,res)=>{
  const tasks = await Task.find({ project: req.params.projectId }).populate('assignee','name email');
  res.json({ success:true, data: tasks });
};

exports.get = async (req,res)=>{
  const t = await Task.findById(req.params.id).populate('assignee','name email');
  if(!t) return res.status(404).json({ success:false, message:'Task not found' });
  res.json({ success:true, data: t });
};

exports.create = async (req,res)=>{
  const { title, description, project } = req.body;
  const task = await Task.create({ title, description, project, assignee: req.body.assignee });
  if(project) await Project.findByIdAndUpdate(project, { $push:{ tasks: task._id } });
  res.status(201).json({ success:true, data: task });
};

exports.update = async (req,res)=>{
  const t = await Task.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json({ success:true, data: t });
};

exports.remove = async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success:true });
};
