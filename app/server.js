/* Modulos */
const express = require("express"); // Permite crear servidores
const bodyParser = require("body-parser"); // Permite entender peticiones POST
const cors = require("cors");
const methodOverride = require("method-override");
const fileupload = require("express-fileupload");
const path = require("path");
var routes = require("./routes/index");

// Instancia de express
var server = express();

/* Middlewares */
server.use(bodyParser.urlencoded({ extended: false })); // Permite entender datos enviados por formularios (sin imagenes)
server.use(bodyParser.json()); // Permite entender peticiones del navegador (pasa los POST, GET, etc a Json)
server.use(methodOverride());
server.use(cors());
server.use(fileupload());

// Llamada a rutas
server.use("/api", routes);

module.exports = server;
