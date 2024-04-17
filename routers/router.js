
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/controller');

router.post('/api/card', cardController.postCard);
router.get('/api/cards', cardController.getAllCards);

module.exports = router;
