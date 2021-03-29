let express = require('express')
let router = express.Router()

let noticia_controller = require('../controllers/NoticiaController')

router.get('/index',noticia_controller.action_noticia_index)

router.get('/create',noticia_controller.action_noticia_create)
router.post('/create',noticia_controller.noticia_create)

router.get('/preview/id/:id',noticia_controller.action_noticia_preview)

router.get('/delete/id/:id',noticia_controller.noticia_delete)

router.get('/view/id/:id',noticia_controller.action_noticia_view)

module.exports = router