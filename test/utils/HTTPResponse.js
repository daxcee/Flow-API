var config = require('config');
var nock = require('nock');

function HTTPResponse(basePath, endpoint) {
    this.appURL = 'http://' + config.get('app_url');
    this.basePath = basePath;
    this.endpoint = endpoint;
}

HTTPResponse.prototype.setApp = function(appURL){
    this.appURL = appURL
};

HTTPResponse.prototype.setBasePath = function(basePath){
    this.basePath = basePath
};

HTTPResponse.prototype.setEndpoint = function(endpoint){
    this.endpoint = endpoint
};

HTTPResponse.prototype.setGETResponse = function(statusCode, response) {

    var options = {
        headers: { 'Content-Type': 'application/json'},
        resonseCode:statusCode,
        response: response
    };

    console.log('incoming options:' + JSON.stringify(options));

    var scope =  nock(this.appURL + this.basePath, {
        reqheaders: options.headers
    })
        .get(this.endpoint)
        .reply(options.statusCode,options.response);
    this.nock = scope;

    return scope
};

//TODO
//HTTPResponse.prototype.setPOSTResponse = function(statusCode, response) {}


HTTPResponse.prototype.done = function() {
    this.nock.done()
};

HTTPResponse.prototype.isDone = function() {
    return this.nock.isDone()
};

module.exports = HTTPResponse;