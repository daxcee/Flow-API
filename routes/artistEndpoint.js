var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var tokenValidator = require('../authenticators/facebook/facebookTokenValidator.js');

var base = '/api/v1/artists';

router.use(base, function(req,res,next){
    return tokenValidator.validate(req,res,next);
});

router.get(base, controllerLoader.artistController.getAllArtists);
router.get(base + '/:id',controllerLoader.artistController.getArtistById);

module.exports = router;