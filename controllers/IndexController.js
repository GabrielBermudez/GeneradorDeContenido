let conexion_sequelize = require('./Conexion_sequelize');
let sequelize = conexion_sequelize.conexion();

exports.action_index = function (req, res) {
	let message = 'Bienvenido...';

	sequelize.authenticate()
	 	.then(() => {
	    	console.log('Conectado')
	  	})
	  	.catch(err => {
	    	console.log('No se conecto', err)
	  	})
    res.render('index', { title: 'Express' });

};