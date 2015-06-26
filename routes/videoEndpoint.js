var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var tokenValidator = require('../utils/tokenValidator.js');

var base = '/api/v1/videos';

router.use(base, function(req,res,next){
    return tokenValidator.validate(req,res,next);
});

router.get(base, controllerLoader.videoController.getAllVideos);
router.get(base + '/:id', controllerLoader.videoController.getVideoById);
router.get(base + '/:id/artist', controllerLoader.videoController.getVideoByArtistId);

module.exports = router;