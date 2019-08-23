const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middleware/autentication');
const usuarioController = require('../controllers/usuarioController');


module.exports = () =>{


	//Crea un nuevo Usuario
	router.post('/', usuarioController.subirArchivo, 
		             usuarioController.crearUsuario
    );

    //Lista todos los Usuario
    router.get('/', usuarioController.listarUsuario);

    //Busca Usuario por ID
    router.get('/:idUsuario',  mdAutenticacion.verificaToken, usuarioController.buscarUsuario);

    //Actulaizar Usuario por ID
     router.put('/:idUsuario', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_o_MismoUsuario ], usuarioController.subirArchivo,
    	                       usuarioController.actualizarUsuario);

    //Elimina un Usuario por ID
    router.delete('/:idUsuario', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE ], usuarioController.eliminarUsuario);


	return router;
}