var express = require('express');
var router = express.Router();

let index_controller = require('../controllers/IndexController');

router.get('/index', index_controller.action_index);

module.exports = router;
