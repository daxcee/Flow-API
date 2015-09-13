require('../models/user')();

var mongoose = require('mongoose');
var pretty = require('../utils/pretty');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//User model is scoped to above specific connection object
var User = conn.model('User');
var FBToken = conn.model('FBToken');

module.exports = {
    userById: function(tokenDetails, callback){
        User.findOne({fbId: tokenDetails.userId}).populate('token').exec(function(err,user) {
            if (err) {
                callback(err);
                return;
            }

            if(!user){
                callback(null);
                return
            }

            // loop through the user tokens to check if provided token is linked to the current user
            for(var j = 0; j < user.token.length; j++) {
                var token = user.token[j];

                if (token.value === tokenDetails.token) { // found token, return user
                    callback(user);
                    return;
                }
            }

            var newToken = new FBToken({
                value:tokenDetails.token,
                expires: tokenDetails.expires,
                appId: tokenDetails.appId,
                scopes: tokenDetails.scopes,
                isValid:tokenDetails.isValid
            });

            newToken.save(function (err) {
                if (err) {
                    callback(err);
                    return;
                }

                user.token.push(newToken._id);

                user.save(function (err) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(user);
                });
            });
        });
    }
};