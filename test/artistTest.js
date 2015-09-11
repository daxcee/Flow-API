var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var db = require('./utils/dbHelper');
var MockedHTTPResponse = require('./utils/HTTPResponse.js');
var HTTPClient = require('./utils/HTTPClient.js');

describe('-------- ARTIST ENDPOINTS --------', function() {

    var basePath = '/api/v1';
    var endpoint = '/artists';
    var artist;

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('artist');
        artist =  options.artist;
        done()
    });


    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return an Artist item', function(done) {
            var httpResponse = new MockedHTTPResponse(basePath,endpoint);
            httpResponse.setGETResponse(200,{'artist':artist});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(endpoint,options,function(res){

               assert.equal(res.body.artist._id, artist._id);
                assert.equal(res.body.artist.artistName, artist.artistName);

                done()
            });


        });
    });

    describe('GET ' + basePath + '/:artistId', function() {
        it('Should return Artist items of whose id is provided', function(done) {
            var resource = endpoint + '/' + artist._id;

            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{'artist':artist});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){

                assert.equal(res.body.artist._id, artist._id);
                assert.equal(res.body.artist.artistName, artist.artistName);

                done()
            });
        });
    });
});