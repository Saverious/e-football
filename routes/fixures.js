const express = require('express');
const router = express.Router();

const { createFixureGet, createFixurePost, updateFixureGet, updateFixurePost } = require('../controllers/fixures');

router.get('/create-fixure', createFixureGet);
router.post('/create-fixure', createFixurePost);
router.get('/update-fixure', updateFixureGet);
router.post('/update-fixure', updateFixurePost);

module.exports = router;