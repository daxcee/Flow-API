var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

var base = '/api/v1/videos';

router.get(base, passwordless.restricted(),
    function() {
        router.get(base, controllerLoader.videoController.getAllVideos);
    });

router.get(base + '/:id', passwordless.restricted(),
    function() {
        router.get(base + '/:id', controllerLoader.videoController.getVideoById);
    });

router.get(base + '/:id/artist', passwordless.restricted(),
    function() {
        router.get(base + '/:id/artist', controllerLoader.videoController.getVideoByArtistId);
    });

module.exports = router;