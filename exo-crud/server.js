/* Requirements */

var express = require('express');
var app = express();
var mongoClient = require("mongodb").MongoClient;
var mongoURL = "mongodb://localhost/oyez";
var ObjectId = require('mongodb').ObjectID;

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



/* API */
app.get("/api/create", function(req, res){
	mongoClient.connect(mongoURL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("oyez");
		var myobj = { userId: req.query.userID, string: req.query.string };
		dbo.collection("strings").insertOne(myobj, function(err, result) {
			if (err) throw err;
			console.log("Added the record "+req.query.string+"for user N."+req.query.userID+".");
			db.close();
			setTimeout(function (){res.send(result.ops);}, 2000);
		});
	});
});

app.get("/api/delete", function(req, res){
	mongoClient.connect(mongoURL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("oyez");
		dbo.collection("strings").remove({ _id: ObjectId(req.query.stringId) }, function(err, result) {
			if (err) throw err;
			console.log("Removed the record n."+req.query.stringId);
			db.close();
		});
	});
	setTimeout(function(){res.json({state : "ok"});}, 2000);
});

app.get("/api/list", function(req, res){
	mongoClient.connect(mongoURL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("oyez");
		var myobj = { userId: req.query.userID, string: req.query.string };
		dbo.collection("strings").find().toArray(function(err, items) {
			if (err) throw err;
			db.close();
			setTimeout(function (){res.send(items);}, 2000);
		});
	});
});

/* 404 */

app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
})

.listen(8090);
