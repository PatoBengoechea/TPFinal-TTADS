const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

var movie = require("../models/movie");

var ObjectId = mongoose.Types.ObjectId;

// Traer todas las películas`
router.get("/", (req, res, next) => {
  movie
    .find({})
    .then(movies => {
      if (!movies) {
        return res.json({status: false, data: null, message: "No hay peliculas cargadas"})
      }
      return res.json({status: true, data: { movies: movies }, message: null});
    })
    .catch(next => {
      return res.json({status: false, data: null, message: "Error al obtener peliculas"})
    });
});

// Traer una película
router.get("/unique/:id", (req, res, next) => {
  let id = req.params.id;
  movie
    .find({ _id: ObjectId(id) })
    .populate("actors")
    .then(movies => {
      if (!movies) {
        return res.json({status: false, data: null, message: "No hay pelicula con ese ID"})
      }
      return res.json({status: true, data: { movies: movies }, message: null });
    })
    .catch(next => { 
      return res.json({status: false, data: null, message: "Error al obtener pelicula"})
    });
});

//Traer peliculas en base al titulo
router.get("/:partialTitle", (req, res, next) => {
  let partialTitle = req.params.partialTitle;
  movie
    .find({ name: { $regex: partialTitle, $options: "i" } })
    .populate("actors")
    .then(movies => {
      if (!movies) {
        return res.json({status: false, data: null, message: "No hay peliculas con ese ID"})
      }
      return res.json({status: true, data: {movies: movies }, message: null});
    })
    .catch(err => {
      console.log(err => {
        return res.json({status: false, data: null, message: "Error al obtener peliculas"})
      });
    });
});

// Create movie
router.post("/", (req, res, next) => {
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
      return res.json({status: true, data: {result: "Pelicula guardada"}, message: null})
    })
    .catch(err => {
      console.log(err);
      return res.json({status: false, data: null, message: "Error al crear pelicula"})
    });

  next();
});

//Update movie (de otra forma)
updateMovie = function(req, res) {
  movie.findById(req.params.id, function(err, movieToUpdate) {
    if (!err) {
      movieToUpdate.name = req.body.name;
      movieToUpdate.genre = req.body.genre;
      movieToUpdate.year = req.body.year;
      movieToUpdate.release_date = req.body.release_date;
    } else console.log("Ha ocurrido el siguiente eror: " + err);
  });
  movie.save(function(err) {
    if (!err) {
      return res.json({status: true, data: {result: "Pelicula modificada"}, message: null})
    }
    else {
      return res.json({status: false, data: null, message: "Error al actualizar peliculas"})
    }
  });
  res.send(movieToUpdate);
};

// Controlador para update
router.put("/movie/:id", updateMovie);

// Delete movie
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  movie.findByIdAndRemove(id);
  res.status(200)
  return res.json({status: false, data: null, message: "Error al obtener peliculas"})
});

// Votar una película
router.put("/vote/:id", (req, res, next) => {
  let id = req.params.id;
  if (req.body.vote) {
    movie
      .findOneAndUpdate({ _id: ObjectId(id) }, { $inc: { vote: 1 } })
      .catch(err => {
        res.status(400)
        return res.json({status: true, data: null, message: "Error al votar una pelicula"})
      });
  } else {
    movie
      .findOneAndUpdate({ _id: ObjectId(id) }, { $inc: { vote: -1 } })
      .then( result => {
        res.status(200)
        return res.json({status: true, data: {result: "Votacion aceptada"}, message: null})
      })
      .catch(err => {
        console.log(err);
        res.status(400)
        return res.json({status: false, data: null, message: "Error al votar una pelicula"})
      });
  }

  next();
});

// Traer populares
router.get("/movie/popular", (req, res, next) => {
  movie
    .find({ vote: { $gte: 10 } })
    .then(movies => {
      if (!movies) {
        res.status(200)
        return res.json({status: true, data: null, message: "No hay peliculas populares disponibles"})
      }
      res.status(200)
      return res.json({status: true, data: { movies: movies }, message: null});
    })
    .catch(next => {
      res.status(400)
      return res.json({status: false, data: null, message: "Error al obtener peliculas populares"})
    });
});

// Traer now-playing
router.get("/movie/now-playing", (req, res, next) => {
  let date2 = new Date();
  date2.setMonth(date2.getMonth() - 1);
  movie
    .find({ release_date: { $gte: date2 } })
    .then(movies => {
      if (!movies) {
        res.status(200)
        return res.json({status: true, data: null, message: "No hay peliculas en cartelera"})
      }
      res.status(200)
      return res.json({status: true, data: { movies: movies }, message: null});
    })
    .catch(next => { 
      res.status(400)
      return res.json({status: false, data: null, message: "Error al obtener peliculas"})
    });
});

// Traer películas de un actor
router.get("/movieActor/:id_actor", (req, res, next) => {
  let id_actor = req.param.id_actor;
  movie
    .find({ actors: id_actor })
    .populate("actors")
    .then(actorMovies => {
      if (!actorMovies) {
        res.status(200)
        return res.json({status: true, data: null, message: "No hay peliculas para ese actor"})
      }
      res.status(200)
      return res.json({status: true, data: { actorMovies: actorMovies }, message: null});
    })
    .catch(next => {
      res.status(400)
      return res.json({status: false, data: null, message: "Error al obtener peliculas"})
    });
});

module.exports = router;
