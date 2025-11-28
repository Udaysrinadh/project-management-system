const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
  name: { type:String, required:true },
  description: String,
  image: String,
  members: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' }, role: String }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref:'Project' }]
},{ timestamps:true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);
