const cardModel = require('../models/cat');

async function postCard(req, res) {
    try {
        const card = req.body;
        const result = await cardModel.postCard(card);
        res.status(201).json({ statusCode: 201, data: result, message: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
}

async function getAllCards(req, res) {
    try {
        const result = await cardModel.getAllCards();
        res.status(200).json({ statusCode: 200, data: result, message: 'get all cards successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
}

async function deleteCard(req, res) {
    try {
        const cardId = req.params.id;
        if (!cardId) {
            return res.status(400).json({ statusCode: 400, message: 'Card ID is required' });
        }
        
        const result = await cardModel.deleteCard(cardId);
        if (!result) {
            return res.status(404).json({ statusCode: 404, message: 'Card not found' });
        }
        
        res.status(200).json({ statusCode: 200, data: result, message: 'Card deleted successfully' });
    } catch (err) {
        console.error('Error deleting card:', err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
}


module.exports = {
    postCard,
    getAllCards,
    deleteCard
};
