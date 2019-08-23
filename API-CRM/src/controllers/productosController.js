const productos = require('../models/productosModels');
const multer = require('multer');
const shortid = require('shortid');


const configuracionMulter = {

	storage: fileStorage = multer.diskStorage({

		destination: (req, file, cb) => {
			cb(null, __dirname+'../../uploads/');
		},

		filename: (req, file, cb) => {
			const extension = file.mimetype.split('/')[1];
				cb(null, `${shortid.generate()}.${extension}`);
		}
	}),

	fileFilter(req, file, cb){

		if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
			cb(null, true);
		}else{
			cb(new Error('Formato no válido'))
		}

	},

}


//Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');


//Sube un archivo
exports.subirArchivo = (req, res, next) => {

	upload(req, res, function(err){
		if(err){
			res.status(400).json({ 
				ok:false,
				mensaje:'Error al subir imagen' 
			});
		}
		return next();
	});

}


//Agrega un nuevo Producto
exports.nuevoProducto = async (req, res, next) => {

	const producto = new productos(req.body);

	try{

		if(req.file.filename){
			producto.imagen = req.file.filename
		}

		await producto.save();
		res.status(200).json({
			ok:true,
			mensaje: 'Se agrego un nuevo producto'
		});

	}catch(error){
		console.log(error);
		next();
	}
	
}


//Lista todos los productos
exports.listarPoducto = async (req, res, next) => {

	try{
		const producto = await productos.find({});
		res.json(producto)
	}
	catch(error){
		console.log(error);
		next();
	}
}


//Busca producto por ID
exports.buscarProducto = async (req, res, next) => {

	const producto = await productos.findById(req.params.idProducto);

	if(!producto){
		res.status(400).json({
			ok:false,
			mensaje: 'El producto no existe'
		});
		next();
	}

	res.status(200).json({
		ok:true,
		producto
	});

}


//Actualizar productos por ID
exports.actualizarProducto = async (req, res, next) => {

	try{

        //Construimos un nuevo producto
        const nuevoProducto = req.body;

        //Verificar si hay imagen nueva
        if(req.file){
        	nuevoProducto.imagen = req.file.filename;
        }else{
        	const productoAnterior = await productos.findById(req.params.idProducto);
        	nuevoProducto.imagen = productoAnterior.imagen;
        }

		const producto = await productos.findOneAndUpdate({ _id : req.params.idProducto },
			nuevoProducto, {
				new : true,
			});

		res.status(200).json({
			ok:true,
			producto
		});
	}

	catch(error){
		console.log(error);
		next();
	}

}


//Eliminar un producto por el ID
exports.eliminarProducto = async (req, res, next) => {

	try{
		await productos.findOneAndDelete({ _id : req.params.idProducto });
		res.json({ mensaje: 'Producto eliminado' });
	}catch(error){
		console.log(error);
		next();
	}
}