
// const express = require('express');
// const router = express.Router();
// const cardController = require('../controllers/controller');

// router.post('/api/card', cardController.postCard);
// router.get('/api/cards', cardController.getAllCards);

// module.exports = router;
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/controller');

router.post('/card', cardController.postCard);
router.get('/cards', cardController.getAllCards);
router.delete('/card/:id', cardController.deleteCard); // Add this line for handling DELETE requests

module.exports = router;
