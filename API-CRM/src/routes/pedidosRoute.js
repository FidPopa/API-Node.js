const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middleware/autentication');
const pedidosController = require('../controllers/perdidosController');


module.exports = () => {
  
  //Agregar un pedido
  router.post('/', mdAutenticacion.verificaToken, pedidosController.agregarPedido);

  //Listar pedidos
  router.get('/', mdAutenticacion.verificaToken, pedidosController.listarPedido);

  //Buscar pedido por ID
  router.get('/:idPedido', mdAutenticacion.verificaToken, pedidosController.buscarPedido);

  //Actualizar pedido por ID
  router.put('/:idPedido', mdAutenticacion.verificaToken, pedidosController.actualizarPedido);

  //ELiminar pedido por ID
  router.delete('/:idPedido', mdAutenticacion.verificaToken, pedidosController.eliminarPedido);


  return router;
}