var config = require('config');
var request = require('request');
var accessTokenNamespace = 'access_token';
var fbAppIdNamespace = 'fb_app_id';
var fbAppSecretNamespace = 'fb_app_secret';
var fbGraphBasePath = 'https://graph.facebook.com/v2.4';
var fbGraphDebugTokenEndpoint = '/debug_token';
var inputTokenNamespace = 'input_token';
var fieldsNamespace = 'fields';
var scopes = ['id','email','name'];

module.exports = {

    debugToken: function(token,callback) {
        var queryString = '?' + inputTokenNamespace + '=' + token +
            '&' + accessTokenNamespace + '=' + config.get(fbAppIdNamespace) + '|' +
            config.get(fbAppSecretNamespace);
        var requestURL = fbGraphBasePath + fbGraphDebugTokenEndpoint + queryString;

        request(requestURL, function (err, result, body) {
            if (err) {
                callback(err,result, null);
                return
            }

            callback(null,result,JSON.parse(body))
        });
    },

    userCredentials: function(tokenDetails,callback) {
        var scopeFields = '&' + fieldsNamespace  + '=';

        for (var i = 0; i < scopes.length; i++) {
            if (i != 0){
                scopeFields += ',' + scopes[i]
            } else {
                scopeFields += scopes[i]
            }
        }

        var queryString = '/' + tokenDetails.userId + '?' + accessTokenNamespace + '=' + tokenDetails.token + scopeFields ;
        var requestURL = fbGraphBasePath + queryString;

        request(requestURL, function (err, result, body) {
            if (err) {
                callback(err,result, null);
                return
            }

            callback(null,result,JSON.parse(body))
        });
    }
};