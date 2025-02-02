const express = require('express');
const router = express.Router();
const profileController = require('../app/controllers/profileController');


    // newController.index
    router.use('/',profileController.index)


module.exports = router;