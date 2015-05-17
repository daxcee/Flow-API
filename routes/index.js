require('dotenv').load();
var express = require('express');
var router = express.Router();
var app = express();
var port = process.argv[2] || 3000;
var http = require('http');
app.set('json spaces', 2);
var host = process.env.DB_HOST;
var db_port = process.env.DB_PORT;
var db_name = process.env.DB_NAME;
var db_user = process.env.DB_USER;
var db_pass = process.env.DB_PASSWORD;
var url = 'mongodb://' + db_user + ':' + db_pass + '@' + host + ':' + db_port + '/' + db_name;
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(request, response) {
  response.send('Flow API is running.');
});

router.get('/api/artists', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log("Connected correctly to: ", url);

            var collection = db.collection('artists');

            // Query DB, artist collection
            collection.find({mediaType: 'bio'}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res.setHeader("Content-Type", "application/json");
                    res.end(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(result));
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                    res.setHeader("Content-Type", "application/json");
                    res.end('No document(s) found with defined "find" criteria!');
                }
                //Close connection
                db.close();
            });
        }
    });

});

router.get('/api/tracks', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify("Foo:bar"));
});

module.exports = router;