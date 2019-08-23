const clientes = require('../models/clientesModels');


//AGREGA UN NUEVO CLIENTE
exports.nuevoCliente = async (req, res, next) => {

	const cliente = new clientes(req.body);

	try{ 
      //almacena el registro
      await cliente.save();

      res.status(200).json({
      	ok:true,
      	mensaje: 'se agrego un nuevo cliente'
      });

	}catch(error){
		//si hay un error, console.log y next
		console.log(error);
		next();
	}
	
}


//LISTA TODOS LOS CLIENTES
exports.listarCliente = async (req, res, next) => {

	try{
		const cliente = await clientes.find({});
		res.json(cliente);
	}catch (error){
         console.log(error);
         next(); 
	}
	
}


//BUSCA CLIENTES POR ID
exports.buscarCliente = async (req, res, next) => {
	
	const cliente = await clientes.findById(req.params.idCliente);

	if(!cliente){
		res.status(400).json({
			ok:false,
			mensaje: 'El cliente no existe'
		});
		next()
	}

	res.status(200).json({
		ok:true,
		cliente
	});
}


//ACTUALIZA CLIENTES POR ID
exports.actualizarCliente = async (req, res, next) => {

	try{
		const cliente = await clientes.findOneAndUpdate({_id : req.params.idCliente },
			req.body,{
				new : true 
			});
		    res.json(cliente)

	}catch(error){
			console.log(error)
			next();
	}

}


//ELIMINAR CLIENTE POR ID
exports.eliminarCliente = async (req, res, next) => {

	try{
		await clientes.findOneAndDelete({ _id : req.params.idCliente });
		res.json({mensaje: 'El cliente se ha eliminado'});
	}catch (error){
		console.log(error);
		next();
	}

}