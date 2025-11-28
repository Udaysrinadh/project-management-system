const mongoose = require('mongoose');
const User = require('../models/User');
const Workspace = require('../models/Workspace');
const Project = require('../models/Project');
const Task = require('../models/Task');

async function runSeed(){
  // simple seed: create admin user, workspace, project, tasks
  await User.deleteMany({});
  await Workspace.deleteMany({});
  await Project.deleteMany({});
  await Task.deleteMany({});

  const admin = await User.create({ name:'Admin User', email:'admin@example.com', password: await require('bcryptjs').hash('password',10) });
  const member = await User.create({ name:'Jane Doe', email:'jane@example.com', password: await require('bcryptjs').hash('password',10) });

  const ws = await Workspace.create({ name:'Default Org', description:'Seeded org', members:[{ userId: admin._id, role:'ADMIN' }, { userId: member._id, role:'MEMBER' }] });
  const proj = await Project.create({ title:'Website Redesign', description:'Landing + dashboard', workspace: ws._id, members:[{ userId: admin._id, role:'ADMIN' }, { userId: member._id, role:'MEMBER' }] });
  await Workspace.findByIdAndUpdate(ws._id, { $push:{ projects: proj._id } });

  const t1 = await Task.create({ title:'Create wireframes', description:'Make wireframes for homepage', project: proj._id, assignee: admin._id });
  const t2 = await Task.create({ title:'Build auth', description:'Signup/login API', project: proj._id, assignee: member._id, status:'IN_PROGRESS' });

  await Project.findByIdAndUpdate(proj._id, { $push:{ tasks: t1._id }});
  await Project.findByIdAndUpdate(proj._id, { $push:{ tasks: t2._id }});
  return;
}

module.exports = { runSeed };
