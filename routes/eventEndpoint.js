var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();

var base = '/api/v1/events';

router.get(base, controllerLoader.eventController.getAllEvents);
router.get(base + '/:id',controllerLoader.eventController.getEventById);
router.get(base + '/date/:id',controllerLoader.eventController.getEventByDate);
router.get(base + '/genre/:id',controllerLoader.eventController.getEventByGenre);
router.get(base + '/artist/:id',controllerLoader.eventController.getEventByArtist);
router.get(base + '/city/:id',controllerLoader.eventController.getEventByCity);

module.exports = router;