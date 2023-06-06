const express = require('express');
const router = express.Router();

const { registerGet, registerPost, addTeamGet, addTeamPost } = require('../controllers/regLeague');

router.get('/register-league', registerGet);
router.post('/register-league', registerPost);
router.get('/add-team', addTeamGet);
router.post('/add-team', addTeamPost);

module.exports = router;