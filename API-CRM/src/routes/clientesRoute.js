const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middleware/autentication');
const clientesController = require('../controllers/clientesController');


module.exports = () =>{

    //Agrega un nuevo cliente
	router.post('/', mdAutenticacion.verificaToken, clientesController.nuevoCliente);

	//Lista los clientes
	router.get('/', mdAutenticacion.verificaToken, clientesController.listarCliente);

    //Busca un cliente por ID
    router.get('/:idCliente', mdAutenticacion.verificaToken, clientesController.buscarCliente);

    //Actualiza clientes por ID
    router.put('/:idCliente', mdAutenticacion.verificaToken, clientesController.actualizarCliente);

    //Eliminar clientes por ID
    router.delete('/:idCliente', mdAutenticacion.verificaToken, clientesController.eliminarCliente);

    return router;

}

