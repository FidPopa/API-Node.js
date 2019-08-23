const pedidos = require('../models/pedidosModels');


exports.agregarPedido =  async (req, res, next) => {

	const pedido = new pedidos(req.body);

	try{
		await pedido.save();
		res.status(200).json({
			ok:true,
			mensaje:'Se agregó un nuevo pedido'
		});
	} 

	catch(error){
		console.log(error);
		next();
	}

}


//Lista todos los pedido
exports.listarPedido = async (req, res, next) => {

	try{
		const pedido = await pedidos.find({}).populate('cliente').populate({
			path: 'pedido.producto',
			model: 'productos'
		});
		res.status(200).json({
			ok:true,
			pedido
		});
	}

	catch(error){
		console.log(error);
		next();
	}

}

//Lista un pedido por su ID
exports.buscarPedido = async (req, res, next) =>{
  
  const pedido = await pedidos.findById(req.params.idPedido).populate('cliente').populate({
			path: 'pedido.producto',
			model: 'productos'
		});

  if(!pedido){
  	res.status(400).json({
  		ok:false,
  		mensaje: 'El pedido no existe'
  	});
  	return next();
  }

  res.status(200).json({
      ok: true,
      pedido
  });

}


//Actuliza pedidos por ID
exports.actualizarPedido = async (req, res, next) => {

  try{

  	const pedido = await pedidos.findOneAndUpdate({ _id : req.params.idPedido }, req.body,{
      new: true
	})
	.populate('cliente')
	.populate({
		path: 'pedido.producto',
		model: 'productos'
	});

	res.status(200).json({
		ok:true,
		pedido
	});

  }catch(error){
  	console.log(error);
  	next();
  }

}


//Elimina un pedido por ID
exports.eliminarPedido = async (req, res, next) =>{

  try{
  	 await pedidos.findOneAndDelete({ _id : req.params.idPedido });
  	 res.status(200).json({
  	 	ok:true,
  	 	mensaje: 'Pedido eliminado',
  	 });
  }

  catch(error){
  	console.log(error);
  	next();
  }

}