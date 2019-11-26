var mongoose = require('mongoose');
var router = require('express').Router();
var movie = mongoose.model('movie');

var ObjectId = mongoose.Types.ObjectId;

// Traer todas las películas
router.get('/', (req, res, next) => {
    movie.find({})
        .then(movies => {
            if (!movies) { return res.sendStatus(401); }
            return res.json({ 'movies': movies })
        })
        .catch(next);
});

// Traer una película
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    movie.find({ "_id": ObjectId(id) })
        .populate('actors')
        .then(movies => {
            if (!movies) { return res.sendStatus(401); }
            return res.json({ 'movies': movies })
        })
        .catch(next);

});

// Create movie
router.post('/', (req, res, next) => {
    let name = req.body.name;
    let genre = req.body.genre;
    let year = req.body.year;
    let release_date = req.body.release_date;
    let vote = req.body.vote;

    let mo = new movie({
        name: req.body.name,
        genre: req.body.genre,
        year: req.body.year,
        img_path: req.body.img_path,
        release_date: req.body.release_date,
        vote: req.body.vote
    });

    mo.save()
        .then(doc => {
            console.log(doc);
            res.send("name:" + name + ' ' + "genre:" + genre + ' ' + "year:" + year);
        })
        .catch(err => {
            console.log(err);
            res.send("Ha ocurrido un error, intentelo de nuevo mas tarde");
        });

    next();
});

//Update movie (de otra forma)
updateMovie = function(req, res){
    movie.findById(req.params.id, function(err, movieToUpdate){
        if(!err){
            movieToUpdate.name = req.body.name;
            movieToUpdate.genre = req.body.genre;
            movieToUpdate.year = req.body.year;
            movieToUpdate.release_date= req.body.release_date;
        } else console.log('Ha ocurrido el siguiente eror: ' +err);
    });
    movie.save(function(err){
        if(!err) console.log/('Película actualizada!');
        else console.log('Ha ocurrido el siguiente eror: ' +err);
    });
    res.send(movieToUpdate);
}

// Controlador para update
router.put('/movie/:id', updateMovie);

// Delete movie
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    movie.findByIdAndRemove(id);
    res.sendStatus(200);
});

// Votar una película
router.put('/vote/:id', (req, res, next) => {
    let id = req.params.id;
    if(req.body.vote){
        movie.findOneAndUpdate({ "_id": ObjectId(id) }, {$inc:{vote:1}})
            .catch(err => {
            console.log(err);
            res.send('Ha ocurrido un error, intentelo de nuevo mas tarde');
        });
    }
    else {
        movie.findOneAndUpdate({ "_id": ObjectId(id) }, {$inc:{vote:-1}})
            .catch(err => {
                console.log(err);
                res.send('Ha ocurrido un error, intentelo de nuevo mas tarde');
            });
    }


    next();


});

// Traer populares
router.get('/movie/popular', (req, res, next) => {
    movie.find({ vote: { $gte: 10 } })
        .then(movies => {
            if (!movies) { return res.sendStatus(401); }
            return res.json({ 'movies': movies })
        })
        .catch(next);
});

// Traer now-playing
router.get('/movie/now-playing', (req, res, next) => {
    let date2 = new Date();
    date2.setMonth(date2.getMonth() - 1);
    movie.find({ release_date: { $gte: date2 } })
        .then(movies => {
            if (!movies) { return res.sendStatus(401); }
            return res.json({ 'movies': movies })
        })
        .catch(next);
});

// Traer películas de un actor
router.get('/movieActor/:id_actor', (req, res, next) => {
    let id_actor = req.param.id_actor;
    movie.find({ actors : id_actor })
        .populate('actors')
        .then(actorMovies => {
            if(!actorMovies){ return res.sendStatus(401);}
            return res.json({'actorMovies': actorMovies})
        })
        .catch(next);
});

module.exports = router;