const express = require('express');
const router = express.Router();

const { blog, contact, index, matches, players, single } = require('../controllers/view');

router.get('/blog', blog);
router.get('/contact', contact);
router.get('/', index);
router.get('/matches', matches);
router.get('/players', players);
router.get('/single', single);

module.exports = router;