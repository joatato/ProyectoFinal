import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import productsRouter from './routes/products.router.js';
import { router as sessionsRouter } from './routes/sessions.router.js';
import cartsRouter from './routes/carts.router.js';
import ViewsRouter from './routes/views.router.js';
import __dirname from './utils/utils.js';
import { config } from './config/config.js';





// const viewsRouter = new ViewsRouter()
const PORT = config.app.PORT;

const app = express();
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'API de abm Estufas San Juan',
          version: '1.0.0',
          description: 'Documentación de la API de ejemplo de abm usuarios y productos',
      },
  },
  apis: ['./src/docs/*.yaml'], // Rutas de tus archivos de rutas a documentar
};

// Inicializar swagger-jsdoc
const specs = swaggerJsdoc(options);

// Middleware para servir la documentación Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const io = new Server(server);

app.engine('handlebars', engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));
// app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public/assets'));

app.use('/api/products', (req, res, next) => {
  req.serverSocket = io;
  next();
}, productsRouter);


// DEBO AVERIGUAR POR QUE EL PROFE UTILIZA EL "secret:'miPalabraSecreta'"
app.use(session({
  secret: config.app.SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: config.database.MONGOURL,
    ttl: 60
  })
}));

app.use('/api/sessions', sessionsRouter)
app.use('/api/carts', cartsRouter);
app.use('/', ViewsRouter);


const env = async () => {
  try {
    await mongoose.connect(config.database.MONGOURL)
    console.log(`Conexión a servidor DB establecida...!!!`);
  } catch (error) {
    console.log(`Error al conectarse con el servidor de BD: ${error}`);
  }
}


env();

const mensajes = [];

io.on('connection', (socket) => {
  // console.log(socket.handshake);
  console.log(`Se han conectado, socket id ${socket.id}`)

  socket.emit('hola', {
    emisor: 'Servidor',
    mensaje: `Hola, desde el server...!!!`,
    mensajes
  })

  socket.on('respuestaAlSaludo', (mensaje) => {
    console.log(`${mensaje.emisor} dice ${mensaje.mensaje}`);

    socket.broadcast.emit('nuevoUsuario', mensaje.emisor)
  })

  socket.on('mensaje', (mensaje) => {
    console.log(`${mensaje.emisor} dice ${mensaje.mensaje}`);

    // todo el codigo que quiera...
    mensajes.push(mensaje);
    console.log(mensajes);

    // socket.broadcast.emit('nuevoMensaje',mensaje)
    io.emit('nuevoMensaje', mensaje)

  })


}) // fin de server.on connection

// Socket De horario (Su uso mas que nada es para ver cuando no funque el socket)
setInterval(() => {
  let pHorario = new Date().toLocaleTimeString()
  // let pHorario = 2
  io.emit('actualizarHorario', pHorario)
}, 1000);

server.on('error', (error) => console.log(error));


// console.log(`Esto es lo que leo ${config.database.MONGOURL}`);
