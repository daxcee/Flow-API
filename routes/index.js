
var express = require('express');
var router = express.Router();
var path = require("path");
var passwordless = require('passwordless');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res) {
    res.sendFile('api-overview.html', { root: path.join(__dirname, '../public') });
});

router.get('/token-request', function(req, res) {
    res.sendFile('token-request.html', { root: path.join(__dirname, '../public') });
});

router.get('/send', function(req, res) {
    res.sendFile('send.html', { root: path.join(__dirname, '../public') });
});

router.get('/404', function(req, res) {
    res.sendFile('404.html', { root: path.join(__dirname, '../public') });
});

router.post('/sendtoken',
    passwordless.requestToken(
        function(user, delivery, callback, req) {
            callback(null, user);
        }),
    function(req, res) {
        res.writeHead(302, {'Location': '/send'});
            res.end();
    }
);

module.exports = router;