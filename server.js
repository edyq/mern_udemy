// bring up the express server and let it run

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect db
connectDB()

// create endpoint for connection testing
app.get('/', (req, res) => res.send('API Running'));

// create the env var to set PORT. when we deploy it on heroku, it will look
// for the env var to connect to PORT 
// if there is no env var set, it will go to 5000
const PORT = process.env.PORT || 5000;

// create callback. log when connected
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));