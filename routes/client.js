var express = require('express')
var router = express.Router()

var client_controller = require('../controllers/ClientController')

router.get('/index', client_controller.action_client_index)

router.get('/home/id/:fk', client_controller.action_client_home)

router.post('/home/id/:fk/search/', client_controller.action_client_home_search_noticies)

router.get('/detalle/id/:id', client_controller.action_client_detalle)

module.exports = router