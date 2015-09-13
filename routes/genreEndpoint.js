var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var tokenValidator = require('../authenticators/facebook/facebookTokenValidator.js');

var base = '/api/v1/genres';

router.use(base, function(req,res,next){
    return tokenValidator.validate(req,res,next);
});

router.get(base, controllerLoader.genreController.getAllGenres);
router.get(base + '/:id', controllerLoader.genreController.getGenreById);

module.exports = router;