const express = require('express');
const parseCtrl = require('../controllers/parse');
const router = express.Router();
module.exports = router;

router.get('/json/:date', parseCtrl.parseJSONFromURL);
router.get('/web', parseCtrl.parseWebFromURL);