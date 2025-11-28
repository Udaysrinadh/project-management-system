const connectDB = require('../utils/db');
const { runSeed } = require('./seedRunner');

(async ()=>{
  await connectDB();
  await runSeed();
  console.log('Seed completed');
  process.exit(0);
})();
