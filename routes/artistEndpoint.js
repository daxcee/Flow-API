var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

var base = '/api/v1/artists';
router.get(base, passwordless.restricted(),
    function() {
        router.get(base, controllerLoader.artistController.getAllArtists);
    });
router.get(base + '/:id', passwordless.restricted(),
    function() {
        router.get(base + '/:id',controllerLoader.artistController.getArtistById);
    });


module.exports = router;