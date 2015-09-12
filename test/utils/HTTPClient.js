var config = require('config');
var httpRequest = require('supertest')(config.get('test_app_url'));
var express = require('express');

function HTTPClient(basePath) {
    this.appURL = 'http://' + config.get('test_app_url');
    this.basePath = basePath;
}

HTTPClient.prototype.setApp = function(appURL){
    this.appURL = appURL
};

HTTPClient.prototype.setBasePath = function(basePath){
    this.basePath = basePath
};

HTTPClient.prototype.setEndpoint = function(endpoint){
    this.endpoint = endpoint
};

HTTPClient.prototype.doGet = function(endpoint, options, callback){
    this.endpoint = endpoint;
    var requestURL = this.basePath + this.endpoint;

    console.log('requestURL: ' + requestURL);

    var request = httpRequest.get(requestURL);
    processHeaders(request,options);
    request.end(function(err, res){
        if (err) {
            callback(err);
            done();
            return
        }
        callback(res);
        done();
    });
};

function processHeaders(request, options) {
    request.expect(options.statusCode);
    setAcceptHeaders(request, options.headers.accept);
    setExpectHeaders(request, options.headers.expect)
}

function setAcceptHeaders(request, headers){
    for (var i = 0; i <headers.length; i++) {
        for(key in headers[i]) {
            request.set(key,headers[i][key])
        }
    }
}

function setExpectHeaders(request, headers){
    for (var i = 0; i < headers.length; i++) {
        for(key in headers[i]) {
            request.expect(key,headers[i][key])
        }
    }
}

module.exports = HTTPClient;