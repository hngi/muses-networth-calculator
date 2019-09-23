const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api-routes.js');

const app = express();
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/musesnwc', { 
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

const port = process.env.PORT || 8080;

app.get('/', (req, res) =>
{
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json({"status": "Test"})
});

app.use('/api', (req, res, next) => 
{
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
})

app.use('/api', apiRoutes);

app.listen(port, function () {
     console.log("Running api on port " + port);
});