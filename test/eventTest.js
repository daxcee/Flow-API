var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./utils/dbHelper');

var basePath = '/api/v1/events';

describe('-------- EVENTS ENDPOINTS --------', function() {

    var artist;
    var event;
    var genre;
    var token;
    var tokenPrefix = '?token=';

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('event');
        artist =  options.artist;
        event = options.event;
        token = tokenPrefix + db.createToken();

        done()
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return an Event item', function(done) {
            httpRequest
                .get(basePath + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, event._id);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:eventId', function() {
        it('Should an Event item whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + event._id + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, event._id);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:city/city', function() {
        it('Should return Event items that takes place in provided City ', function(done) {
            httpRequest
                .get(basePath + '/' + event.city + '/city' + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, event._id);
                    assert.equal(res.body.result[0].city, event.city);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:date(dd-mm-yyyy)/date', function() {
        it('Should return Event items that belong to provided Date', function(done) {
            httpRequest
                .get(basePath + '/' + event.date + '/date' + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, event._id);
                    assert.equal(res.body.result[0].date, event.date);

                    done();
                });
        });
    });


    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return Event items that contain provided artist in line-up ', function(done) {
            httpRequest
                .get(basePath + '/' + artist._id + '/artist' + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, event._id);
                    assert.equal(res.body.result[0].date, event.date);
                    assert.equal(res.body.result[0].artists[0].artistName, artist.artistName);

                    done();
                });
        });
    });
});