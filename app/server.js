// Cargar módulo de express
const express = require('express');

// Cargar el módulo de mongoose para poder conectarnos a MongoDB
const mongoose = require('mongoose');

// Nos permite convertir los datos que nos llegan en las peticiones al servidor en objetos JSON
const bodyParser = require('body-parser');

const cors = require('cors');
const methodOverride = require('method-override');

// Instancia de express
var app = express();

app.use(cors());

//Crear el puerto al cual se va a conectar el servidor
const port = 3000;
const portatlas = 27017;

// Cargar middlewares, un metodo que se ejecuta antes que llegue a un controlador
// Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Conectar a la DB con el método "connect" de mongoose
// mongoose.connect('mongodb://localhost/cinema', {useNewUrlParser:true});
mongoose.connect('mongodb+srv://admin:admin@cluster0-geyoz.mongodb.net/cinema',
  { useNewUrlParser: true }, (err) => {
    if(err) console.log("Error al conectar a la DB: " +err);  
    else console.log("We are using MongoDB Atlas"); // Conexión exitosa --> mando mensaje indicativo

    require('./models/movie.js');
    require('./models/actor.js');

    // Llamada a rutas
    app.use(require('./routes'));   
    var router = express.Router();
    app.use(router);

    // Crear el servidor WEB con NodeJS
    app.listen(port, (err) => {
      console.log('We are live on ' + port);
    });

});