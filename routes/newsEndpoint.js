var controllerLoader = require('../controllers/controllerLoader.js');
var express = require('express');
var router = express.Router();
var tokenValidator = require('../utils/tokenValidator.js');

var base = '/api/v1/news';

router.use(base,function(req,res,next){
    return tokenValidator.validate(req,res,next);
});

router.get(base, controllerLoader.newsController.getAllNews);
router.get(base + '/:newsId/', controllerLoader.newsController.getNewsById);
router.get(base + '/:id/date',controllerLoader.newsController.getNewsByDate);

module.exports = router;