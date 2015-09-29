var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res) {
    res.sendFile('api-overview.html', { root: path.join(__dirname, '../public') });
});

router.get('/send', function(req, res) {
    res.sendFile('send.html', { root: path.join(__dirname, '../public') });
});

router.get('/404', function(req, res) {
    res.sendFile('404.html', { root: path.join(__dirname, '../public') });
});

module.exports = router;