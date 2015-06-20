var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();

var base = '/api/v1/events';

router.get(base, controllerLoader.eventController.getAllEvents);
router.get(base + '/:id',controllerLoader.eventController.getEventById);
router.get(base + '/:id/date',controllerLoader.eventController.getEventByDate);
router.get(base + '/:id/genre',controllerLoader.eventController.getEventByGenre);
router.get(base + '/:id/artist',controllerLoader.eventController.getEventByArtist);
router.get(base + '/:id/city',controllerLoader.eventController.getEventByCity);

module.exports = router;