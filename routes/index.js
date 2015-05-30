var express = require('express');

var router = express.Router();
var base = '/api/v1';
var artistEndpoint = base + '/artists';
var albumEndpoint =  base + '/albums';
var genreEndpoint =  base + '/genres';
var trackEndpoint =  base + '/tracks';

//Overview page
router.get('/', function(request, response) {
    response.send('Flow API Endpoints:' + '<br><br>' +
        '<a href="' + albumEndpoint  + '">' + albumEndpoint   + '<br>' +
        '<a href="' + artistEndpoint + '">' + artistEndpoint  + '<br>' +
        '<a href="' + genreEndpoint  + '">' + genreEndpoint   + '<br>' +
        '<a href="' + trackEndpoint  + '">' + trackEndpoint);
});

module.exports = router;