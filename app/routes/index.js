const { Router } = require('express');
const router = Router();

router.use('/api/authentication', require("./authentication"));
router.use('/api/movie', require("./movie"));
router.use('/api/actor', require("./actor"));

module.exports = router;
