const noticiaModel = require('../models/NoticiaModel')
const empresaModel = require('../models/EmpresaModel')

const mv = require('mv')
const fs = require('fs').promises

exports.action_noticia_index = function(req, res) {
	let noticias = noticiaModel.FindAllWithRelation()
    noticias.then(noticias => {
    	res.render('admin/noticia/index',{noticias})
    })
    .catch(err=>{
    	console.log(err);
    	res.status(500).json(err)
    })
	
}

exports.action_noticia_create = function(req, res){
	let empresas = empresaModel.FindAll()

	empresas.then(empresas =>{
		res.render('admin/noticia/create',{noticia:null,empresas})
	})
	.catch(err => {
    	console.log(err)
    	res.status(500).json(err)
  	})
	
}

exports.action_noticia_preview = (req, res) => {
	let noticia = noticiaModel.FindById(req.params.id)

	noticia.then(noticia =>{
		res.render('admin/noticia/preview',{noticia})
	})
	.catch(err =>{
		console.log(err)
		res.status(500).json(err)
	})
}

exports.action_noticia_view = function(req, res) {
    let noticia = noticiaModel.FindAllWithRelationByID(req.params.id)

    noticia.then(noticia =>{
        res.render('admin/noticia/view',{noticia})
    })
    .catch(err => {
        console.log(err)
        res.estatus(500).json(err)
    })
}

exports.noticia_create = (req, res) => {
	UploadFile(req);
	let noticia = noticiaModel.CreateNotica(req)

	noticia.then(() => {
        res.redirect('/admin/noticia/index')
  	})
  	.catch(err => {
      console.log(err)
      res.status(500).json(err)
  	})	
}

exports.noticia_delete = (req, res) => {
    let noticia = noticiaModel.FindById(req.params.id)

    noticia.then((noticia)=>{
       EliminarImagenNoticia(noticia,res)  
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json(err)
    })
}

/*
UploadFile(req);
            fs.unlink(`./public${product.url}`)
                .then(() => {
                    console.log(`Image of ${product.nombre} has removed`)
                    product.nombre = req.body.nombre;
                    product.descripcion = req.body.descripcion;
                    product.precio = req.body.precio;
                    product.stock = req.body.stock;
                    product.categoria = req.body.categoria;
                    product.fecha_actualizacion = date;
                    product.disponibilidad = req.body.disponibilidad;
                    product.url = `/images/${req.body.categoria}/${req.files.image.name}`;
                    product.save();
                    res.redirect('/admin/product/index');

                }).catch(err => {
                    console.error('Something wrong happened removing the file', err)
                    res.redirect('/admin/product/index');
            })
*/

function UploadFile(req){
    let oldPath = req.files.imagen.tempFilePath;
    let newPath = `./public/images/noticias/${req.files.imagen.name}`;

    mv(oldPath, newPath, {mkdirp: true}, function(err) {
        if(err) 
            return res.status(500).send({ message : err })

        console.log(`File ${req.files.imagen.name} has moved in public/images/...`)
    	return true;
    });
}

function EliminarImagenNoticia(noticia,res){
    fs.unlink(`./public${noticia.imagen_noticia}`)
        .then(()=>{
            console.log(`Image of ${noticia.imagen_noticia} has removed`)
            BorrarNoticia(noticia,res);
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json(err)
        })
}

function BorrarNoticia(noticia,res){
    let noticiaToDelete = noticiaModel.DeleteNoticia(noticia.id_noticia)
        noticiaToDelete.then(()=>{
            res.redirect('/admin/noticia/index');
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json(err)
        })
}