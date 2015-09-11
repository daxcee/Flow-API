var config = require('config');
var httpRequest = require('supertest')(config.get('app_url'));

function HTTPClient(basePath) {
    this.appURL = 'http://' + config.get('app_url');
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

HTTPClient.prototype.doGet = function(endpoint,options, callback){
    this.endpoint = endpoint;
    //processHeaders(request,options);

    var request = httpRequest
        .get(this.basePath + this.endpoint)
        .expect(200)
        .set('Accept','application/json')
        .expect('Content-Type', 'application/json')
        .end(function(err, res){
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