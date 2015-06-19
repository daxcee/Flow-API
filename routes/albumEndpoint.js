var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

var base = '/api/v1/albums';

router.get(base, passwordless.restricted(),
    function(req, res) {
        router.get(base + '/:id', controllerLoader.albumController.getAllAlbums);
    });

router.get(base + '/:id', passwordless.restricted(),
    function(req, res) {
        router.get(base + '/:id', controllerLoader.albumController.getAlbumById);
    });

router.get(base + '/:id/artist', passwordless.restricted(),
    function(req, res) {
        router.get(base + '/:id', controllerLoader.albumController.getAlbumByArtistId);
    });

module.exports = router;