var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var tokenValidator = require('../authenticators/facebook/facebookTokenValidator.js');

var base = '/api/v1/albums';

router.use(base, function(req,res,next){
    return tokenValidator.validate(req,res,next);
});

router.get(base, controllerLoader.albumController.getAllAlbums);
router.get(base + '/:id', controllerLoader.albumController.getAlbumById);
router.use(base + '/:id/artist', controllerLoader.albumController.getAlbumByArtistId);

module.exports = router;