const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Cors permite que un cliente se conecte a otro servidor para el intercanvio de recursos.
const cors = require('cors');


//Inicializacion
const app = express();


//Importamos rutas
const clienteRouter = require('./src/routes/clientesRoute');
const productoRouter = require('./src/routes/productosRoute');
const pedidosRouter = require('./src/routes/pedidosRoute');
const usuarioRouter = require('./src/routes/usuarioRoute');
const loginRouter = require('./src/routes/loginRoute');



//Conectar Mongo
mongoose.connect('mongodb://localhost/clientes', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})
 .then(db=> console.log('BD: \x1b[32m%s\x1b[0m', 'online'))
 .catch(err=> console.log(err));


//Midleware
app.use(morgan('dev'));


//habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Habilitar cors
app.use(cors());


//Rutas
app.use('/login', loginRouter());
app.use('/usuarios', usuarioRouter());
app.use('/clientes', clienteRouter());
app.use('/productos', productoRouter());
app.use('/pedidos', pedidosRouter());



//Escuchar peticiones
app.listen(3000, () => {
	console.log('Server in port 3000: \x1b[32m%s\x1b[0m', 'online');
})



