const Sequelize = require('sequelize')

exports.conexion = function (req, res) {
	let sequelize = new Sequelize('generador_codigo', 'gabriel', 'root', {
	  host: 'localhost',
	  dialect: 'mysql',
	})

	return sequelize;
};