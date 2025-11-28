const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type:String, required:true },
  description: String,
  status: { type:String, enum:['TODO','IN_PROGRESS','DONE'], default:'TODO' },
  priority: { type:String, enum:['LOW','MEDIUM','HIGH'], default:'MEDIUM' },
  dueDate: Date,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref:'Project' },
  attachments: [String],
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref:'User'}, text: String, createdAt: Date }]
},{ timestamps:true });

module.exports = mongoose.model('Task', TaskSchema);
