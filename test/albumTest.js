var assert = require("assert");
var db = require('./utils/dbHelper');
var MockedHTTPResponse = require('./utils/HTTPResponse.js');
var HTTPClient = require('./utils/HTTPClient.js');

describe('-------- ALBUM ENDPOINTS --------', function() {

    var artist;
    var album;
    var token;
    var basePath = '/api/v1';
    var endpoint = '/albums';

    before(function(done) {
        var options = db.createDataForEndpoint('album');
        artist =  options.artist;
        album = options.album;
        done();
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases


    describe('GET ' + basePath, function() {
        it('Should return an Album item', function(done) {
            var httpResponse = new MockedHTTPResponse(basePath,endpoint);

            httpResponse.setGETResponse(200,{'album':album});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(endpoint,options,function(res){

                assert.equal(res.body.album._id, album._id);
                assert.equal(res.body.album.artists[0].artistName, artist.artistName);

                done()
            });
        });
    });

    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return an Album item that belongs to the artist found by its id', function(done) {
            var resource =  endpoint + '/' + artist._id + '/artist';

            var httpResponse = new MockedHTTPResponse(basePath, resource);
            httpResponse.setGETResponse(200,{'album':album});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){

                assert.equal(res.body.album._id, album._id);
                assert.equal(res.body.album.artists[0].artistName, artist.artistName);

                done()
            });


        });
    });
});