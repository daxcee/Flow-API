var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();

var base = '/api/v1/artists';

router.get(base, controllerLoader.artistController.getAllArtists);
router.get(base + '/:id',controllerLoader.artistController.getArtistById);

module.exports = router;