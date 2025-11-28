require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const connectDB = require('./utils/db');
const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

app.use('/api', apiRouter);

// 404
app.use((req, res) => res.status(404).json({ success:false, message:'Not found' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success:false, message: err.message || 'Server error' });
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
