require('../../models/fbtoken')();
require('../../models/user')();

var serverResponse = require('../../utils/resultResponse.js');
var fbGraphAPI = require('../../authenticators/facebook/facebookGraphAPI.js');
var mongoose = require('mongoose');
var config = require('config');
var pretty = require('../../utils/pretty.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//User & FBToken models are scoped to above specific connection object
var FBToken = conn.model('FBToken');
var User = conn.model('User');
var query = require('../../queriers/usersQuerier.js');

module.exports = {

    verifyUser: function validateToken(req,res) {
        if (req.headers.authorization === 'undefined') {
            serverResponse.result(res, "FB token not provided, please provide a valid FB app token");
            return
        }

        var token = req.headers.authorization;
        var self = this;

        fbGraphAPI.debugToken(token, function(err,result,data) {
            if(err) {
                serverResponse.error(res,pretty.print(err));
                return
            }

            if(result.statusCode == 200) {
                if (data['data']['is_valid'] == true) {

                    var debugTokenDetails = data['data'];
                    var tokenDetails = {
                        token:token,
                        expires:debugTokenDetails['expires_at'],
                        userId:debugTokenDetails['user_id'],
                        appId:debugTokenDetails['app_id'],
                        scopes:debugTokenDetails['scopes'],
                        isValid:debugTokenDetails['is_valid']
                    };

                    self.getUser(tokenDetails, function(userCredentials) {
                        query.userById(res, tokenDetails.userId, function(user){
                            if (user != null) {
                                var result = {
                                    id:user._id,
                                    name:user.name,
                                    email:user.email,
                                    tokenIsValid:tokenDetails.isValid
                                };
                                serverResponse.result(res, pretty.print(result));
                            } else {
                                self.registerNewUser(tokenDetails,userCredentials,function(result){
                                    serverResponse.result(res, pretty.print(result));
                                });
                            }
                        });
                    });
                } else {
                    serverResponse.invalidFBToken(res, pretty.print(data['data']));
                }
            }
            else {
                serverResponse.error(res,data)
            }
        });
    },

    getUser: function getUser(tokenDetails, callback){
        fbGraphAPI.userCredentials(tokenDetails, function(err,result,data) {
            if(err) {
                callback(err);
                return
            }

            if(result.statusCode == 200) {
                callback(data)
            }
        });
    },

    registerNewUser: function registerNewUser(tokenDetails, userCredentials, callback){
        var user = new User({
            _Id: userCredentials['id'],
            name: userCredentials['name'],
            email: userCredentials['email']
        });
        user.save(function (err) {
            if (err) {
                callback(err);
            } else {
                var token = new FBToken({
                    _userId: user._Id,
                    expires: tokenDetails.expires,
                    appId: tokenDetails.appId,
                    scopes: tokenDetails.scopes,
                    isValid:tokenDetails.isValid
                });
                token.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        var result = {
                            user: user,
                            token: token
                        };
                        callback(JSON.stringify(result))
                    }
                });
            }
        });
    }
};