var fbAuthenticator = require('../authenticators/facebook/facebookAuthenticator.js');

module.exports = {

    authenticate: function (req, res) {
        fbAuthenticator.registerUser(req,res)
    }
};