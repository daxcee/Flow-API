var assert = require("assert");
var db = require('./utils/dbHelper');
var MockedHTTPResponse = require('./utils/HTTPResponse.js');
var HTTPClient = require('./utils/HTTPClient.js');

describe('-------- TRACK ENDPOINTS --------', function() {

    var basePath = '/api/v1';
    var endpoint = '/tracks';
    var artist;
    var track;

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('track');
        artist =  options.artist;
        track = options.track;
        done();
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return a Track item', function(done) {
            var httpResponse = new MockedHTTPResponse(basePath,endpoint);
            httpResponse.setGETResponse(200,{ track:track});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(endpoint,options,function(res){
                assert.equal(res.body.track._id, track._id);
                assert.equal(res.body.track.artists[0].artistName, artist.artistName);
                done()
            });
        });
    });

   describe('GET ' + basePath + '/:trackId', function() {
        it('Should return a Track item whose id is provided', function(done) {
            var resource = endpoint + '/' + track._id;
            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{ track:track});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){
                assert.equal(res.body.track._id, track._id);
                assert.equal(res.body.track.artists[0].artistName, artist.artistName);
                done()
            });
        });
    });

    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return a Track item whose id is provided', function(done) {
            var resource = endpoint + '/' + artist._id + '/artist';
            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{ track:track});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){
                assert.equal(res.body.track._id, track._id);
                assert.equal(res.body.track.artists[0].artistName, artist.artistName);
                done()
            });
        });
    });
});