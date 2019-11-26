var router = require('express').Router();

router.use('/api/movie', require('./movie'));

router.use('/api/actor', require('./actor'));

module.exports=router;