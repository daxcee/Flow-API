var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

var base = '/api/v1/events';

router.get(base, passwordless.restricted(),
    function() {
        router.get(base, controllerLoader.eventController.getAllEvents);
    });

router.get(base + '/:id', passwordless.restricted(),
    function() {
        router.get(base + '/:id',controllerLoader.eventController.getEventById);
    });

router.get(base + '/:id/date', passwordless.restricted(),
    function() {
        router.get(base + '/:id/date',controllerLoader.eventController.getEventByDate);
    });

router.get(base + '/:id/genre', passwordless.restricted(),
    function() {
        router.get(base + '/:id/genre',controllerLoader.eventController.getEventByGenre);
    });

router.get(base + '/:id/artist', passwordless.restricted(),
    function() {
        router.get(base + '/:id/artist',controllerLoader.eventController.getEventByArtist);
    });

router.get(base + '/:id/city', passwordless.restricted(),
    function() {
        router.get(base + '/:id/city',controllerLoader.eventController.getEventByCity);
    });

module.exports = router;