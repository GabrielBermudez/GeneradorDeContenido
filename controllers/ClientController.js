const noticiaModel = require('../models/NoticiaModel')
const empresaModel = require('../models/EmpresaModel')

exports.action_client_index = (req,res) => {
	let empresas = empresaModel.FindAll()

	empresas.then(empresas=>{
		req.session.empresas = null;
		res.render('client/index',{empresas})
	})
	.catch(err =>{
		res.status(500).json(err)
	})
	
}

exports.action_client_home = (req,res) => {
	let noticias = noticiaModel.FindAllByFK(req.params.id)
	let empresa = empresaModel.FindById(req.params.id)

	noticias.then(noticias=>{
		empresa.then(empresa=>{
			req.session.empresa = empresa
			res.render('client/home',{noticias,empresa})
		})
		.catch(err =>{
			res.status(500).json(err)
		})
	})
	.catch(err =>{
		res.status(500).json(err)
	})
	
}