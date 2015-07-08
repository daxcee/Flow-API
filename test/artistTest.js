var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./testRunnerHelper');

var basePath = '/api/v1/artists';

describe('-------- ARTIST ENDPOINTS --------', function() {

    var artist;
    var token;
    var tokenPrefix = '?token=';

    //Do preliminary setup, before running each testcase.
    before(function(done) {

        var options = db.createDataForEndpoint('artist');
        artist =  options.artist;
        token = tokenPrefix + db.createToken();

        done()
    });


    after(function(done) {
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

                    assert.equal(res.body.result[0]._id, artist._id);
                    assert.equal(res.body.result[0].artistName, artist.artistName);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:artistId', function() {
        it('Should return Artist items of whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + artist._id + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, artist._id);
                    assert.equal(res.body.result[0].artistName, artist.artistName);

                    done();
                });
        });
    });
});