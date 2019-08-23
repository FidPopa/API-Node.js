const usuarios = require('../models/usuarioModels');
const multer = require('multer');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const mdAutenticacion = require('../middleware/autentication');
const jwt = require('jsonwebtoken');



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




//Lista todos los usuarios
exports.listarUsuario = async (req, res, next) => {

  try{

  	const usuario = await usuarios.find({});


  	res.status(200).json({
  		ok:true,
  		usuario
  	});
  }

  catch(error){
  	console.log(error);
  	next();
  }

}




//Crear un nuevo usuario
exports.crearUsuario =  async (req, res, next) => {

  const usuario = new usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);

  try{

  	if(req.file.filename){
			usuario.imagen = req.file.filename
		}

		await usuario.save();
		res.status(200).json({
			ok:true,
			mensaje: 'Usuario creado correctamente',
			usuario,
			usuarioToken: req.usuario
		});

  }

  catch(error){
  	console.log(error);
  	res.json({
      mensaje: 'Hubo un error'
  	});
  }


}


//busca un usuario por su ID
exports.buscarUsuario = async (req, res, next) => {
  
   const usuario = await usuarios.findById(req.params.idUsuario);

   if(!usuario){
   	 res.status(400).json({
   	 	ok:false,
   	 	mensaje: 'El usuario no existe'
   	 });
   	 next();
   }

   usuario.password =   '.i.';

   res.status(200).json({
   	ok:true,
   	usuario
   });

} 


//Actualiza un usuario por ID
exports.actualizarUsuario = async (req, res, next) => {

		try{

        //Construimos un nuevo producto
        const nuevoUsuario = req.body;
        nuevoUsuario.password = await bcrypt.hash(req.body.password, 12);

        //Verificar si hay imagen nueva
        if(req.file){
        	nuevoUsuario.imagen = req.file.filename;
        }else{
        	const usuarioAnterior = await usuarios.findById(req.params.idUsuario);
        	nuevoUsuario.imagen = usuarioAnterior.imagen;
        }

		const usuario = await usuarios.findOneAndUpdate({ _id : req.params.idUsuario },
			nuevoUsuario, {
				new : true,
			});


		usuario.password =   '.i.';

		res.status(200).json({
			ok:true,
			usuario
		});
	}

	catch(error){
		console.log(error);
		next();
	}

}


//Elimina un usuario por ID
exports.eliminarUsuario = async (req, res, next) => {


	try{
		await usuarios.findOneAndDelete({ _id : req.params.idUsuario });
		res.json({ mensaje: 'Usuario eliminado' });
	}catch(error){
		console.log(error);
		next();
	}
}


