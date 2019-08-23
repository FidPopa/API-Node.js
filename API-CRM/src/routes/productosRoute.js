const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middleware/autentication');
const productosController = require('../controllers/productosController');


module.exports = () => {

    //Ccrea un nuevo Producto
	router.post('/', mdAutenticacion.verificaToken, productosController.subirArchivo, 
		             productosController.nuevoProducto
    );

    //Lista todos los productos
    router.get('/', mdAutenticacion.verificaToken, productosController.listarPoducto);

    //Busca productos por ID
    router.get('/:idProducto' , mdAutenticacion.verificaToken, productosController.buscarProducto);

    //Actulaizar productos por ID
    router.put('/:idProducto', mdAutenticacion.verificaToken, productosController.subirArchivo,
    	                       productosController.actualizarProducto);

    //Elimina un producto por ID
    router.delete('/:idProducto', mdAutenticacion.verificaToken, productosController.eliminarProducto);


	return router;

}