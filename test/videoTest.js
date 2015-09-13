var assert = require("assert");
var db = require('./utils/dbHelper');
var MockedHTTPResponse = require('./utils/HTTPResponse.js');
var HTTPClient = require('./utils/HTTPClient.js');

describe('-------- VIDEO ENDPOINTS --------', function() {

    var basePath = '/api/v1';
    var endpoint = '/videos';
    var artist;
    var video;

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('video');
        artist =  options.artist;
        video = options.video;
        done();
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return a Video item', function(done) {
            var httpResponse = new MockedHTTPResponse(basePath,endpoint);
            httpResponse.setGETResponse(200,{ video:video});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(endpoint,options,function(res){
                assert.equal(res.body.video._id, video._id);
                done()
            });
        });
    });

    describe('GET ' + basePath, function() {
        it('Should a Video item whose id is provided', function(done) {
            var resource = endpoint + '/' + video._id;
            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{ video:video});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){
                assert.equal(res.body.video._id, video._id);
                done()
            });
        });
    });

    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return a Video item that belongs to the artist found by its id', function(done) {
            var resource = endpoint + '/' + artist._id + '/artist';
            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{ video:video});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){
                assert.equal(res.body.video._id, video._id);
                assert.equal(res.body.video.artists[0].artistName, artist.artistName);

                done()
            });
        });
    });
});