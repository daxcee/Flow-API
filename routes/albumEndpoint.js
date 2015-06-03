var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();

var base = '/api/v1/albums';

router.get(base, controllerLoader.albumController.getAllAlbums);
router.get(base + '/:id', controllerLoader.albumController.getAlbumById);
router.get(base + '/artist/:id', controllerLoader.albumController.getAlbumByArtistId);

module.exports = router;