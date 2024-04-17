
const cardModel = require('../models/cat');

async function postCard(req, res) {
    try {
        const card = req.body;
        const result = await cardModel.postCard(card);
        res.json({ statusCode: 201, data: result, message: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
}

async function getAllCards(req, res) {
    try {
        const result = await cardModel.getAllCards();
        res.json({ statusCode: 200, data: result, message: 'get all cards successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
}

module.exports = {
    postCard,
    getAllCards
};
