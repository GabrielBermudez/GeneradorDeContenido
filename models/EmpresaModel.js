const Sequelize = require('sequelize') //Libreria

let conexion_sequelize = require('../controllers/Conexion_sequelize'); //Objeto de la clase Conexion_sequelize
let conexion = conexion_sequelize.conexion(); //Objeto retornado de la conexion de sequelize

empresa = conexion.define('empresa', {
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


exports.FindById = (id) => {
	return empresa.findOne({
		where: {
	        id_empresa: id
	    }
	})
}

exports.CreateEmpresa = (req) => {
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

exports.UpdateEmpresa = (req) => {
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

exports.DeleteEmpresa = (req) => {
	return empresa.destroy({
		where: {
	        id_empresa: req.params.id
	    }
	})
}

