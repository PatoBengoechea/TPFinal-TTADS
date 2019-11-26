// Llamada al módulo de mongoose
var mongoose = require('mongoose');

// Crear schema
var actorSchema= new mongoose.Schema({
	name: {type:String, required: true},
	nationality: {type:String, required: true}
}, {collection: "actor"});

mongoose.model('actor', actorSchema);
