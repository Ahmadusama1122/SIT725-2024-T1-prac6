// var express = require("express")
// const { MongoClient, ServerApiVersion } = require('mongodb');
// var app = express()
// //const uri = `mongodb+srv://$ahmadusama200@gmail.com:$ahmadusama@$sit725.vnrvq9k.mongodb.net/?retryWrites=true&w=majority&appName=SIT725`;

// const uri = 'mongodb+srv://usamaahmad1234:5nJHLDdF3BHmv5vv@sit725.vnrvq9k.mongodb.net/?retryWrites=true&w=majority';
// var port = process.env.PORT || 3000;
// let collection;
// app.use(express.static(__dirname + '/public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// }

// );
// async function runDBconnection() {
//     try {
//         await client.connect();
//         collection = client.db().collection('Cat');
//         console.log(collection);
//     }
//     catch (ex) {
//         console.error(ex);
//     }
// }
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
// app.get('/', (req, res) => {
//     res.sendFile('index.html');
// });
// app.get('/api/cards', (req, res) => {
//     getallcards((err, result) => {
//         if (!err) {
//             res.json({ statusCode: 200, data: result, message: 'get all cards ' });
//         }
//     });
// });

// runDBconnection() 

var express = require("express")
var app = express()
let port = process.env.port || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://usamaahmad1234:5nJHLDdF3BHmv5vv@sit725.vnrvq9k.mongodb.net/?retryWrites=true&w=majority';
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        collection = client.db().collection('Cats');
        console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}
async function postCard(card) {
    try {
        const result = await collection.insertOne(card);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function getAllCards() {
    try {
        const cats = await collection.find({}).toArray();
        return cats;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/api/card', async (req, res) => {
    try {
        const card = req.body;
        const result = await postCard(card);
        res.json({ statusCode: 201, data: result, message: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});



app.get('/api/cards', async (req, res) => {
    try {
        const result = await getAllCards();
        res.json({ statusCode: 200, data: result, message: 'get all cards successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log('express server started');
    runDB();
});