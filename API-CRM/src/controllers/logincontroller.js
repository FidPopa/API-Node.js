const login = require('../models/usuarioModels');
var bcrypt = require('bcrypt');
var SEED = require('../config/config').SEED;
var jwt = require('jsonwebtoken');


exports.crearUsuario = (req, res, next) =>{

   const body = req.body;

	login.findOne({ email: body.email }, (err, usuarioDB)=>{

		if(err){
			return res.status(500).json({
				ok:false,
				mensaje: 'Error al buscar usuario',
				errors: err
			});
		}

		if(!usuarioDB){
			return res.status(400).json({
				ok:false,
				mensaje:'Credenciales incorrectas -email',
				errors: err
			});
		}

		if(!bcrypt.compareSync( body.password, usuarioDB.password )){
           return res.status(400).json({
           	ok:false,
           	mensaje:'Credenciales incorrectas -password',
           	errors: err
           });
		}

		usuarioDB.password =   '>:)<---<';

		//Crear Token
         const token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); //4 horas

	    res.status(200).json({
		ok:true,
		usuario: usuarioDB,
		token: token,
		id: usuarioDB._id,
		menu: obtenerMenu(usuarioDB.role)
	    });

	});




	function obtenerMenu(ROLE) {

    var menu = [
        {
            titulo: 'CRM',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Pedidos', url: '/pedidos' },
                { titulo: 'Productos', url: '/productos' }
            ]
        }
    ];

    console.log('ROLE', ROLE);

    if (ROLE === 'ADMIN_ROLE') {
        menu[0].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' },
        	                    { titulo: 'Clientes', url: '/clientes' }
        	                    );
	}
	
    return menu;

}


}



