require('../../models/fbtoken')();
require('../../models/user')();

var serverResponse = require('../../utils/resultResponse.js');
var fbGraphAPI = require('../../authenticators/facebook/facebookGraphAPI.js');
var mongoose = require('mongoose');
var config = require('config');
var pretty = require('../../utils/pretty.js');
var userQuery = require('../../queriers/usersQuerier.js');
var tokenQuery = require('../../queriers/fbTokenQuerier.js');
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//User & FBToken models are scoped to above specific connection object
var FBToken = conn.model('FBToken');
var User = conn.model('User');

module.exports = {

    /**
     * Register Facebook user strategy:
     *
     * 1) Check if provided token(via authorization header) is valid by validating token details with FB Graph debug token API,
     *    a) if token is valid, continue register, see 2.
     *    b) if token is invalid or Graph API class failed, client needs to provide the flow FB login to retrieve, a valid token in order to register,
     *       with backend, register is not completed, return failure to client.
     *
     *
     * 2) Check if user is already registered with us:
     *    a) if a user is already registered, register is completed, return success to client.
     *    b) if a user is not registered with us,(no user is found or userId's do not match, call FB graph API to get the users credentials,
     *       store returned credentials in datastore, register is completed, return success to client
     *    c) if Graph API call failed, return failure to client
     * */
    registerUser: function(req,res) {
        //Check auth header
        if (req.headers.authorization === 'undefined') {
            serverResponse.result(res, "FB token not provided, please provide a valid FB app token");
            return
        }

        var token = req.headers.authorization;
        var self = this;

        self.getDebugTokenDetails(token, function(err, result, tokenDetails){

            if(err != null){
                serverResponse.error(res,err);
                return
            }

            if(result.statusCode != 200){
                //provided token is in valid
                serverResponse.invalidFBToken(res, data['data']);
                return
            }

            //query local datastore for user
            self.getUserById(tokenDetails, function(user){
                //matching user is found, register complete.
                if (user != null) {
                    serverResponse.result(res, user);
                } else {
                    //did not find user in datastore, call FB Graph to retrieve user credentials
                    self.getUserFBCredentials(tokenDetails, function(userCredentials) {
                        //Store user credentials in datastore, register complete.
                        self.saveUser(tokenDetails,userCredentials,function(result){
                            serverResponse.result(res, result);
                        });
                    });
                }
            });
        });
    },

    getDebugTokenDetails:function(token, callback){
        //get token details from FB Graph
        fbGraphAPI.debugToken(token, function(err,result,data) {
            if (err) {
                callback(err);
                return
            }

            if (result.statusCode == 200) {
                //token is valid
                if (data['data']['is_valid'] == true) {
                    var debugTokenDetails = data['data'];
                    var tokenDetails = {
                        token: token,
                        expires: debugTokenDetails['expires_at'],
                        userId: debugTokenDetails['user_id'],
                        appId: debugTokenDetails['app_id'],
                        scopes: debugTokenDetails['scopes'],
                        isValid: debugTokenDetails['is_valid']
                    };

                    callback(err,result, tokenDetails);
                    return
                }
            }

            callback(err,result)
        });
    },

    getUserById:function(tokenDetails, callback){
        userQuery.userById(tokenDetails.userId, function(user){
            if (user != null) {
                var result = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    tokenIsValid: tokenDetails.isValid
                };
                callback(result)
            } else {
                callback(null)
            }
        });
    },

    getUserFBCredentials: function getUser(tokenDetails, callback){
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

    saveUser: function(tokenDetails, userCredentials, callback){
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
                    value:tokenDetails.token,
                    expires: tokenDetails.expires,
                    appId: tokenDetails.appId,
                    scopes: tokenDetails.scopes,
                    isValid:tokenDetails.isValid,
                });

                token.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        var result = {
                            user: user,
                            token: token
                        };
                        callback(result)
                    }
                });
            }
        });
    }
};