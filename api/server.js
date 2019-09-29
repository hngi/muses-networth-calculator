const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const apiRoutes = require('./api-routes.js');

const app = express();
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, { 
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

const port = process.env.PORT || 3000;

app.get('/', (req, res) =>
{
	app.use(express.static(__dirname + '/docs'));
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Access-Control-Allow-Origin', req.header('Origin') || '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,PATCH");
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.statusCode = 200;
	res.sendFile(path.join(__dirname + "/docs/"));
});

app.use('/api', (req, res, next) => 
{
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', req.header('Origin') || '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,PATCH");
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.status(200);
	next();
})

app.use('/api', apiRoutes);

app.listen(port, function () {
     console.log("API running on port " + port);
});