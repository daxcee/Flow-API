var assert = require("assert");
var config = require('config');
var db = require('./utils/dbHelper');
var MockedHTTPResponse = require('./utils/HTTPResponse.js');
var HTTPClient = require('./utils/HTTPClient.js');

describe('-------- EVENTS ENDPOINTS --------', function() {
    var basePath = '/api/v1';
    var endpoint = '/events';
    var artist;
    var event;
    var genre;

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('event');
        artist =  options.artist;
        event = options.event;
        done()
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return an Event item', function(done) {
            var httpResponse = new MockedHTTPResponse(basePath,endpoint);
            httpResponse.setGETResponse(200,{ event:event});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(endpoint,options,function(res){

                assert.equal(res.body.event._id, event._id);

                done()
            });
        });
    });

    describe('GET ' + basePath + '/:eventId', function() {
        it('Should an Event item whose id is provided', function(done) {
            var resource = endpoint + '/:eventId';
            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{ event:event});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){

                assert.equal(res.body.event._id, event._id);

                done()
            });
        });
    });

    describe('GET ' + basePath + '/:city/city', function() {
        it('Should return Event items that takes place in provided City ', function(done) {
            var resource = endpoint + '/' + event.city + '/city';
            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{ event:event});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){

                assert.equal(res.body.event._id, event._id);
                assert.equal(res.body.event._id, event._id);
                assert.equal(res.body.event.city, event.city);
                done()
            });
        });
    });

    describe('GET ' + basePath + '/:date(dd-mm-yyyy)/date', function() {
        it('Should return Event items that belong to provided Date', function(done) {
            var resource = endpoint + '/' + event.date + '/date';
            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{ event:event});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){

                assert.equal(res.body.event._id, event._id);
                assert.equal(res.body.event.date, event.date);
                done()
            });
        });
    });


    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return Event items that contain provided artist in line-up ', function(done) {
            var resource = endpoint + '/' + artist._id + '/artist';
            var httpResponse = new MockedHTTPResponse(basePath,resource);
            httpResponse.setGETResponse(200,{ event:event});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){

                assert.equal(res.body.event._id, event._id);
                assert.equal(res.body.event.date, event.date);
                assert.equal(res.body.event.artists[0].artistName, artist.artistName);

                done()
            });
        });
    });
});