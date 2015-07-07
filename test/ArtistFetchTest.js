var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./DatabaseHelper');

var basePath = '/api/v1/artists';

describe('-------- ARTIST ENDPOINTS --------', function() {
    var artistId;
    var artistName;
    var token;

    //Do preliminary setup, before running each testcase.
    beforeEach(function(done) {
        db.dropAllCollections();

        var options = db.createDateForEndpoint('artist');
        artistId =  options.artist._id;
        artistName = options.artist.artistName;

        var tokenPrefix = '?token=';
        token = tokenPrefix + db.createToken().value;

        done();
    });

    afterEach(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return an Artist item', function(done) {
            httpRequest
                .get(basePath + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, artistId);
                    assert.equal(res.body.result[0].artistName, artistName);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:artistId', function() {
        it('Should return Artist items of whose id is:' + artistId, function(done) {
            httpRequest
                .get(basePath + '/' + artistId + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, artistId);
                    assert.equal(res.body.result[0].artistName, artistName);

                    done();
                });
        });
    });
});