const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/playerController');

router.post('/add', PlayerController.addPlayer);
router.get('/search', PlayerController.getPlayerByName);
router.get('/search/:id', PlayerController.getPlayerById);
router.put('/update/:id', PlayerController.updatePlayer);
module.exports = router;
