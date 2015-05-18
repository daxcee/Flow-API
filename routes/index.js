require('dotenv').load();
var express = require('express');
var router = express.Router();
var app = express();
app.set('json spaces', 0);
var port = process.argv[2] || 3000;
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var mongoDBURL = 'mongodb://' + process.env.DB_USER + ':' +
                         process.env.DB_PASSWORD + '@' +
                         process.env.DB_HOST + ':' +
                         process.env.DB_PORT + '/' +
                         process.env.DB_NAME;

//Overview page
router.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

//GET /api/artists
router.get('/api/artists', function(req, res) {
    MongoClient.connect(mongoDBURL, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log("Connected correctly to: ", mongoDBURL);

            var collection = db.collection('artists');

            // Query DB, artist collection
            collection.find({mediaType: 'bio'}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404);
                    res.setHeader("Content-Type", "text");
                    res.end(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.setHeader("Content-Type", "text");
                    res.end(JSON.stringify(result));
                } else {
                    console.log('No artists were found.');
                    res.status(404);
                    res.setHeader("Content-Type", "application/json");
                    res.end('No artists were found.');
                }

                db.close();
            });
        }
    });
});

//GET /api/artists/<artistname>
router.get("/api/artists/:artistname", function(req,res){
    MongoClient.connect(mongoDBURL, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log("Connected correctly to: ", mongoDBURL);

            var collection = db.collection('artists');

            // Query DB, artist collection
            collection.find({artistName: req.params.artistname}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404);
                    res.setHeader("Content-Type", "text");
                    res.end(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.setHeader("Content-Type", "text");
                    res.end(JSON.stringify(result, null, 2));
                } else {
                    console.log('No artists found by name: ' + req.params.artistname);
                    res.status(404);
                    res.setHeader("Content-Type", "text");
                    res.end('No artists found by name: ' + req.params.artistname );
                }

                db.close();
            });
        }
    });
});

//GET /api/<artistname>/tracks
router.get('/api/:artistname/tracks', function(req, res) {
    MongoClient.connect(mongoDBURL, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log("Connected correctly to: ", mongoDBURL);

            var collection = db.collection('tracks');

            // Query DB, artist collection
            collection.find({artists:{$elemMatch:{artistName:req.params.artistname}}}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404);
                    res.setHeader("Content-Type", "text");
                    res.end(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.setHeader("Content-Type", "text");
                    res.end(JSON.stringify(result, null, 2));
                } else {
                    console.log('No artists found by name: ' + req.params.artistname);
                    res.status(404);
                    res.setHeader("Content-Type", "text");
                    res.end('No tracks found for: ' + req.params.artistname );
                }

                db.close();
            });
        }
    });
});

//GET /api/<artistname>/albums
router.get('/api/:artistname/albums', function(req, res) {
    MongoClient.connect(mongoDBURL, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log("Connected correctly to: ", mongoDBURL);

            var collection = db.collection('albums');

            // Query DB, artist collection
            collection.find({artists:{$elemMatch:{artistName:req.params.artistname}}}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404);
                    res.setHeader("Content-Type", "text");
                    res.end(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.setHeader("Content-Type", "text");
                    res.end(JSON.stringify(result, null, 2));
                } else {
                    console.log('No artists found by name: ' + req.params.artistname);
                    res.status(404);
                    res.setHeader("Content-Type", "text");
                    res.end('No tracks found for: ' + req.params.artistname );
                }

                db.close();
            });
        }
    });
});

module.exports = router;