var assert = require("assert");
var db = require('./utils/dbHelper');
var MockedHTTPResponse = require('./utils/HTTPResponse.js');
var HTTPClient = require('./utils/HTTPClient.js');

describe('-------- GENRE ENDPOINTS --------', function() {
    var basePath = '/api/v1';
    var endpoint = '/genre';
    var genre;

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('genre');
        genre =  options.genre;
        done();
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return a Genre item', function(done) {
            var httpResponse = new MockedHTTPResponse(basePath,endpoint);

            httpResponse.setGETResponse(200,{ genre:genre});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(endpoint,options,function(res){
                assert.equal(res.body.genre._id, genre._id);
                done()
            });
        });
    });

    describe('GET ' + basePath + '/:genreName', function() {
        it('Should return a Genre item whose name is provided', function(done) {
            var resource = endpoint + '/:genreName';
            var httpResponse = new MockedHTTPResponse(basePath,resource);

            httpResponse.setGETResponse(200,{ genre:genre});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){
                assert.equal(res.body.genre._id, genre._id);
                done()
            });
        });
    });
});