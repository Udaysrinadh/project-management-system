const mongoose = require('mongoose');

module.exports = async function connectDB(){
  const uri = process.env.MONGO_URI || 'mongodb+srv://udaysrinadhmitta_db_user:HxXGgn0btEh5yBht@projectmanagement.v7blbee.mongodb.net/?appName=projectmanagement';
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch(err){
    console.error('MongoDB connection error', err.message);
    process.exit(1);
  }
};

