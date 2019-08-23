const express = require('express');
const router = express.Router();
const loginController = require('../controllers/logincontroller');

module.exports = () =>{


	//Login
	router.post('/', loginController.crearUsuario);


	return router;
}