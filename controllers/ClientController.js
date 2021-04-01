const noticiaModel = require('../models/NoticiaModel')
const empresaModel = require('../models/EmpresaModel')

exports.action_client_index = (req,res) => {
	let empresas = empresaModel.FindAll()

	empresas.then(empresas=>{
		req.session.empresa = null;
		res.render('client/index',{empresas})
	})
	.catch(err =>{
		res.status(500).json(err)
	})
	
}

exports.action_client_home = (req,res) => {
	let noticias = noticiaModel.FindAllByFK(req.params.fk)
	let empresa = empresaModel.FindById(req.params.fk)

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


exports.action_client_detalle = (req,res) => {
	let noticia = noticiaModel.FindById(req.params.id)

	noticia.then(noticia =>{
		res.render('client/detalle',{noticia})
	})
	.catch(err =>{
		res.status(500).json(err)
	})
	
}

exports.action_client_home_search_noticies = (req,res) => {
	let noticias = noticiaModel.FindBySearch(req.params.fk,req.body.search)
	let empresa = empresaModel.FindById(req.params.fk)

	noticias.then(noticias =>{
		empresa.then(empresa =>{
			req.session.empresa = empresa
			res.render('client/home',{noticias,empresa})
		})
		.catch(err => {
			res.status(500).json(err)
		})
		
	})
	.catch(err => {
		res.status(500).json(err)
	})
}