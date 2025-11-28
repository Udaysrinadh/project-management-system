const express = require('express');
const router = express.Router();
const { runSeed } = require('../seed/seedRunner');

router.post('/', async (req,res)=>{
  try{
    await runSeed();
    res.json({ success:true, message:'Seed data inserted' });
  }catch(err){
    res.status(500).json({ success:false, message: err.message });
  }
});

module.exports = router;
