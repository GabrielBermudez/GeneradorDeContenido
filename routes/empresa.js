var express = require('express');
var router = express.Router();

let empresa_controller = require('../controllers/EmpresaController');

router.get('/index', empresa_controller.action_empresa_index);

router.get('/create', empresa_controller.action_empresa_create);
router.post('/create', empresa_controller.empresa_create);

router.get('/update/id/:id',empresa_controller.action_empresa_update);
router.post('/update/id/:id',empresa_controller.empresa_update);

router.get('/delete/id/:id',empresa_controller.empresa_delete);

router.get('/view/id/:id',empresa_controller.action_empresa_view);

module.exports = router;