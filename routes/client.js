var express = require('express')
var router = express.Router()

var client_controller = require('../controllers/ClientController')

router.get('/index', client_controller.action_client_index)

router.get('/home/id/:id', client_controller.action_client_home)

module.exports = router