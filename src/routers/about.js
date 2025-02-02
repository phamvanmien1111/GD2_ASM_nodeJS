const express = require('express');
const router = express.Router();
const aboutController = require('../app/controllers/AboutController');


    // newController.index
    router.use('/',aboutController.index)


module.exports = router;