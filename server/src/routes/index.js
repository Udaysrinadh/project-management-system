const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/workspaces', require('./workspaces'));
router.use('/projects', require('./projects'));
router.use('/tasks', require('./tasks'));
router.use('/seed', require('./seed'));

module.exports = router;
