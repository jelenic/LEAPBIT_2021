const express = require('express');
const restCtrl = require('../controllers/rest');

const router = express.Router();
module.exports = router;

// router.get('/kino', restCtrl.getKinos);
router.get('/kino/:name', restCtrl.getSingleKinoData);
router.get('/kino/:name/:minms', restCtrl.getSingleKinoDataQ);
router.get('/kino/:name/draw/:ms', restCtrl.getSingleDrawData);
