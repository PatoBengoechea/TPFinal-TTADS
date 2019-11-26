// Llamar al módulo de mongoose
const mongoose = require('mongoose');

// Crear schema
var movieSchema= new mongoose.Schema({
	name: {type: String, required: true},
	year: {type: Number, required: true},
	genre: {type: String, required: true},
	img_path: {type: String, required: false},
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'actor'}],
	release_date: {type: Date, required: false},
	vote: {type: Number, required: false}
}, {collection:'movie'});

mongoose.model('movie', movieSchema);
