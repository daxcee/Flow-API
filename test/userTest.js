var assert = require("assert");
var db = require('./utils/dbHelper');
var MockedHTTPResponse = require('./utils/HTTPResponse.js');
var HTTPClient = require('./utils/HTTPClient.js');

describe('-------- AUTHENTICATE ENDPOINT --------', function() {

    var basePath = '/api/v1';
    var endpoint = '/authenticate';
    var user;

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('user');
        user =  options.user;

        done()
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    describe('GET ' + basePath + endpoint, function() {
        it('Should return an Authenticated user item', function(done) {
            var httpResponse = new MockedHTTPResponse(basePath,endpoint);

            httpResponse.setGETResponse(200,{ user:{
                id: user._Id,
                name: user.name,
                email: user.email
            }});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(endpoint,options,function(res){

                assert.equal(res.body.user.id, user._Id);
                assert.equal(res.body.user.name, user.name);
                assert.equal(res.body.user.email, user.email);

                done()
            });
        });
    });
});