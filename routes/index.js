var express = require('express');

var router = express.Router();
var path = require("path");
var passwordless = require('passwordless');

router.get('/', function(req, res) {
    res.sendFile('api-overview.html', { root: path.join(__dirname, '../public') });
});

router.get('/token-request', function(req, res) {
    res.sendFile('token-request.html', { root: path.join(__dirname, '../public') });
});

/* POST login details. */
router.post('/sendtoken',
    passwordless.requestToken(
        // Turn the email address into an user ID
        function(user, delivery, callback, req) {
            callback(null, user);
        }),
    function(req, res) {
        // success!
        res.send('token has been sent');
    });
module.exports = router;