// dbconnection.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://usamaahmad1234:5nJHLDdF3BHmv5vv@sit725.vnrvq9k.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

let database;

async function connectDB() {
    try {
        await client.connect();
        database = client.db();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function getCollection(collectionName) {
    if (!database) {
        throw new Error('Database is not connected');
    }
    return database.collection(collectionName);
}

module.exports = {
    connectDB,
    getCollection
};
