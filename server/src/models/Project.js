const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type:String, required:true },
  description: String,
  color: String,
  workspace: { type: mongoose.Schema.Types.ObjectId, ref:'Workspace' },
  members: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' }, role: String }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref:'Task' }]
},{ timestamps:true });

module.exports = mongoose.model('Project', ProjectSchema);
