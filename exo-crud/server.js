/* Requirements */

var express = require('express');
var app = express();
var mongoClient = require("mongodb").MongoClient;
var mongoURL = "mongodb://localhost/oyez";

/* DB Creation */

mongoClient.connect(mongoURL, function(err, db) {
	if (err) throw err;
	console.log("Database created!");
	db.close();
});

/* Collection `strings` creation */

mongoClient.connect(mongoURL, function(err, db) {
	if (err) throw err;
	var dbo = db.db("oyez");
	dbo.createCollection("strings", function(err, res) {
		if (err) throw err;
		console.log("Collection created!");
		db.close();
	});
});



/* API */ //TODO : Rajouter timeout sur les api
app.get("/api/create", function(req, res){
	mongoClient.connect(mongoURL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("oyez");
		var myobj = { userId: req.query.userID, string: req.query.string };
		dbo.collection("strings").insertOne(myobj, function(err, res) {
			if (err) throw err;
			console.log("Added the record "+req.query.string+"for user N."+req.query.userID+".");
			db.close();
		});
	});
});

app.get("/api/delete", function(req, res){
	mongoClient.connect(mongoURL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("oyez");
		var myobj = { userId: req.query.userID, string: req.query.string };
		dbo.collection("strings").removeOne(myobj, function(err, res) {
			if (err) throw err;
			console.log("Removed the record "+req.query.string+"for user N."+req.query.userID+".");
			db.close();
		});
	});
});

app.get("/api/list", function(req, res){
	mongoClient.connect(mongoURL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("oyez");
		var myobj = { userId: req.query.userID, string: req.query.string };
		dbo.collection("strings").find().toArray(function(err, items) {
			if (err) throw err;
			db.close();
			res.send(items);
		});
	});
});

/* 404 */

app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
})

.listen(8090);
