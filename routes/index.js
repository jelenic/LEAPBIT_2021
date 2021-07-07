const express = require('express');

const parserRoutes = require('./parse');
const restRoutes = require('./rest');

const router = express.Router();

router.use('/parse', parserRoutes);
router.use('/rest', restRoutes);

module.exports = router;