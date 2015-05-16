var express = require('express');
var router = express.Router();
var app = express();
var port = process.argv[2] || 3000;
var http = require('http');
app.set('json spaces', 2);

router.get('/', function(request, response) {
  response.send('Flow API is running.');
});

router.get('/api/artists', function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify("Foo:bar"));
});

router.get('/api/tracks', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify("Foo:bar"));
});

module.exports = router;