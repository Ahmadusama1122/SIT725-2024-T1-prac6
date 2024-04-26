
// const express = require('express');
// const bodyParser = require('body-parser');
// const router = require('./routers/router'); 
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Use the routes defined in router.js
// app.use('/', router);

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const router = require('./routers/router'); 
const { getAllCards } = require("./models/cat");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', router);
app.get('/', async (req, res) => {
    try {
        const cards = await getAllCards(); // Assuming getAllCards() returns a promise
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/', (req, res) => {
//     res.set('Content-Type', 'application/json');
//     res.json({ path: __dirname + '/views/index.html' });
//     res.json(getAllCards);
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

