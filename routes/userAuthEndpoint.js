var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();

var base = '/api/v1/authenticate';

router.get(base, controllerLoader.fbAuthController.authenticate);

module.exports = router;