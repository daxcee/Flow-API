var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var tokenValidator = require('../utils/tokenValidator.js');

var base = '/api/v1/tracks';

router.use(base, function(req,res,next){
    return tokenValidator.validate(req,res,next);
});

router.get(base, controllerLoader.trackController.getAllTracks);
router.get(base + '/:id', controllerLoader.trackController.getTrackById);
router.get(base + '/:id/artist', controllerLoader.trackController.getTrackByArtistId);


module.exports = router;