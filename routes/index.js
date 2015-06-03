var express = require('express');

var router = express.Router();
var path = require("path");

router.get('/', function(req, res) {
    res.sendFile('api-overview.html', { root: path.join(__dirname, '../public') });
});

module.exports = router;