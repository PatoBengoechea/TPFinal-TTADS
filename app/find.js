mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movie');
mongoose.set('debug', true);

require('./models/movie');
require('./models/actor');

var Movie = mongoose.model('movie');
var Actor = mongoose.model('actor')

Movie.find({})
	.populate('actors')
	.then(function(movies){
		movies.forEach(mo => console.log(mo));
	})

Actor.find({})
	.then(function(actors){
		actors.forEach(act => console.log(act))
	})