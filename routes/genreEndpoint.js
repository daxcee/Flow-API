var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();

var base = '/api/v1/genres';

router.get(base, controllerLoader.genreController.getAllGenres);
router.get(base + '/:id', controllerLoader.genreController.getGenreById);

module.exports = router;