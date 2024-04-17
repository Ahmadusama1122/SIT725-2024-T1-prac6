const dbConnection = require('../dbconnection');

let collection;

async function connectDB() {
    try {
        await dbConnection.connectDB();
        collection = dbConnection.getCollection('Cats');
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function postCard(card) {
    try {
        await connectDB();
        const result = await collection.insertOne(card);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getAllCards() {
    try {
        await connectDB();
        const cats = await collection.find({}).toArray();
        return cats;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    postCard,
    getAllCards
};
