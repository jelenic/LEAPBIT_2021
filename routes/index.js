const express = require('express');
const parserRoutes = require('./parse');
const router = express.Router();

router.use('/parse', parserRoutes);

module.exports = router;