const Sequelize = require('sequelize')
const conexion_sequelize = require('../controllers/Conexion_sequelize')
const conexion = conexion_sequelize.conexion()
const EmpresaModel = require('./EmpresaModel')

noticia = conexion.define('noticias', {
	id_noticia: {type: Sequelize.SMALLINT, primaryKey: true},
	titulo_noticia: Sequelize.STRING,
	resumen_noticia: Sequelize.STRING,
	imagen_noticia: Sequelize.STRING,
	contenido_html: Sequelize.TEXT,
	publicada: Sequelize.BOOLEAN,
	fecha_publicacion: Sequelize.DATE,
	empresa_idempresa: Sequelize.INTEGER,
	
})


exports.FindAll = () => {
	return noticia.findAll()
}

exports.FindById = (id) => {
	return noticia.findOne({
		where:{
			id_noticia: id
		}
	})
}

exports.CreateNotica = (req) => {
	let {titulo,
		resumen,
		contenido,
		publicada,
		fecha,
		empresa,
	} = req.body;

	return noticia.create({
		id_noticia: null,
		titulo_noticia: titulo,
		resumen_noticia: resumen,
		imagen_noticia: `/images/noticias/${req.files.imagen.name}`,
		contenido_html: contenido,
		publicada: publicada,
		fecha_publicacion: fecha,
		empresa_idempresa: empresa,
	})
}

exports.UpdateNoticia = (req) => {
	let {titulo,
		resumen,
		imagen,
		contenido,
		publicada,
		fecha,
		empresa,
	} = req.body;

	return noticia.update({
		titulo_noticia: titulo,
		resumen_noticia: resumen,
		imagen_noticia: imagen,
		contenido_html: contenido,
		publicada: publicada,
		fecha_publicacion: fecha,
		empresa_idempresa: empresa,
		},
		{returning:true, where:{id_empresa: req.params.id}}
	)
}

exports.DeleteNoticia = (id) => {
	return noticia.destroy({
		where: {
			id_noticia: id
		}
	})
}

exports.FindAllWithRelation = () => {
	return conexion.query("SELECT * FROM noticias LEFT JOIN empresas ON noticias.empresa_idempresa = empresas.id_empresa;",
		{ 
			type: conexion.QueryTypes.SELECT
		}
		
)}

exports.FindAllByFK = (fk) => {
	return conexion.query(`SELECT * FROM noticias WHERE empresa_idempresa = ${fk} ORDER BY id_noticia DESC LIMIT 5;`,
		{ 
			type: conexion.QueryTypes.SELECT
		}
)}

exports.FindAllWithRelationByID = (id) => {
	return conexion.query(`SELECT * FROM noticias LEFT JOIN empresas ON noticias.empresa_idempresa = empresas.id_empresa WHERE id_noticia =${id};`,
		{ 
			type: conexion.QueryTypes.SELECT
		}
		
)}


exports.FindBySearch = (fk,search) => {
	return conexion.query(`SELECT * FROM noticias WHERE empresa_idempresa = ${fk} AND titulo_noticia LIKE "%${search}%" ORDER BY fecha_publicacion DESC LIMIT 20`,
		{ 
			type: conexion.QueryTypes.SELECT
		}
)}