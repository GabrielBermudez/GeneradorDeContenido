const Sequelize = require('sequelize') //Libreria

let conexion_sequelize = require('../controllers/Conexion_sequelize'); //Objeto de la clase Conexion_sequelize
let conexion = conexion_sequelize.conexion(); //Objeto retornado de la conexion de sequelize

const empresa = conexion.define('empresa', {
	id_empresa: {type: Sequelize.SMALLINT, primaryKey: true},
	denominacion: Sequelize.STRING,
	telefono: Sequelize.STRING,
	horario_atencion: Sequelize.STRING,
	quienes_somos: Sequelize.STRING,
	latitud: Sequelize.DOUBLE,
	longitud: Sequelize.DOUBLE,
	domicilio: Sequelize.STRING,
	email: Sequelize.STRING,
})

exports.FindAll = () => {
	return empresa.findAll()
}


exports.FindById = function(id) {
	return empresa.findOne({
		attributes: [
			'id_empresa', 
			'denominacion', 
			'telefono', 
			'horario_atencion',
			'quienes_somos',
			'latitud',
			'longitud',
			'domicilio',
			'email'
		], 
		where: {
	        id_empresa: id
	    }
	})
}

exports.CreateEmpresa = function(req){
	let {denominacion,
		telefono,
		horario_atencion_desde,
		horario_atencion_hasta,
		quienes_somos,
		latitud,
		longitud,
		domicilio,
		email,
	} = req.body;

	return empresa.create({
		id_empresa:null,
		denominacion: denominacion,
		telefono: telefono,
		horario_atencion: horario_atencion_desde + '-' + horario_atencion_hasta,
		quienes_somos: quienes_somos,
		latitud: latitud,
		longitud: longitud,
		domicilio: domicilio,
		email: email,

	})
}

exports.UpdateEmpresa = function(req) {
	let {denominacion,
		telefono,
		horario_atencion_desde,
		horario_atencion_hasta,
		quienes_somos,
		latitud,
		longitud,
		domicilio,
		email,
	} = req.body;

	return empresa.update(
		{
			id_empresa:req.params.id,
			denominacion: denominacion,
			telefono: telefono,
			horario_atencion: horario_atencion_desde + '-' + horario_atencion_hasta,
			quienes_somos: quienes_somos,
			latitud: latitud,
			longitud: longitud,
			domicilio: domicilio,
			email: email,
		},
		{returning: true, where: {id_empresa: req.params.id} }
	)
}

exports.DeleteEmpresa = function(req){
	return empresa.destroy({
		where: {
	        id_empresa: req.params.id
	    }
	})
}
