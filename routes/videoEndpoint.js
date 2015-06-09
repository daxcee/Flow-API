var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();

var base = '/api/v1/videos';

router.get(base, controllerLoader.videoController.getAllVideos);
router.get(base + '/:id', controllerLoader.videoController.getVideoById);
router.get(base + '/artist/:id', controllerLoader.videoController.getVideoByArtistId);

module.exports = router;