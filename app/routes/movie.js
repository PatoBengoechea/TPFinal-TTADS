const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();
const colors = require("colors");
const path = require("path");

var movie = require("../models/movie");

var ObjectId = mongoose.Types.ObjectId;

// Traer todas las películas
router.get("/", (req, res, next) => {
  movie
    .find({})
    .then(movies => {
      if (!movies) {
        return res.status(404).json({
          status: false,
          data: null,
          message: "No hay peliculas cargadas"
        });
      }
      return res.json({
        status: true,
        data: { movies: movies },
        message: "Peliculas cargadas"
      });
    })
    .catch(next => {
      return res.json({
        status: false,
        data: null,
        message: "Error al obtener peliculas"
      });
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
        return res.json({
          status: false,
          data: null,
          message: "No hay pelicula con ese ID"
        });
      }
      return res.json({
        status: true,
        data: { movies: movies },
        message: null
      });
    })
    .catch(next => {
      return res.json({
        status: false,
        data: null,
        message: "Error al obtener pelicula"
      });
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
        return res.status(404).json({
          status: false,
          data: null,
          message: "No hay peliculas con ese nombre"
        });
      }
      return res.status(200).json({
        status: true,
        data: { movies },
        message: null
      });
    })
    .catch(err => {
      console.log(colors.red(err));
      return res.json({
        status: false,
        data: null,
        message: "Error al obtener peliculas"
      });
    });
});

// Create movie
router.post("/", async (req, res, next) => {
  let mo = new movie({
    name: req.body.name,
    genre: req.body.genre,
    year: req.body.year,
    img_path: req.body.img_path,
    release_date: req.body.release_date,
    vote: req.body.vote
  });

  await mo
    .save()
    .then(doc => {
      console.log(colors.blue(doc));
      return res.status(200).json({
        status: true,
        data: { result: "Pelicula guardada" },
        message: null
      });
    })
    .catch(err => {
      console.log("error", err);
      return res.status(400).json({
        status: false,
        data: null,
        message: "Error al crear pelicula"
      });
    });

  next();
});

//Update movie (de otra forma)
updateMovie = async function(req, res) {
  await movie.findById(req.params.id, function(err, movieToUpdate) {
    if (!err) {
      movieToUpdate.name = req.body.name;
      movieToUpdate.genre = req.body.genre;
      movieToUpdate.year = req.body.year;
      movieToUpdate.release_date = req.body.release_date;
    } else console.log("Ha ocurrido el siguiente eror: " + err);
  });
  await movie.save(function(err) {
    if (!err) {
      return res.json({
        status: true,
        data: { result: "Pelicula modificada" },
        message: null
      });
    } else {
      return res.status().json({
        status: false,
        data: null,
        message: "Error al actualizar peliculas"
      });
    }
  });
  res.send(movieToUpdate);
};

// Controlador para update
router.put("/movie/:id", updateMovie);

// Delete movie
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  await movie.findByIdAndRemove(id);
  res.status(200);
  return res.status(404).json({
    status: false,
    data: null,
    message: "Error al obtener peliculas"
  });
});

// Votar una película
router.put("/movie/vote/:id", async (req, res, next) => {
  let id = req.params.id;
  console.log("Votar pelicula", req.body);
  if (req.body.vote) {
    await movie
      .updateOne({ _id: ObjectId(id) }, { $inc: { vote: req.body.vote } })
      .then(movieUpdated => {
        return res.status(200).json({
          status: true,
          data: null,
          message: "Votacion aceptada",
          movieUpdated
        });
      })
      .catch(err => {
        if (err)
          return res.status(404).json({
            status: true,
            data: null,
            message:
              "Error al votar una pelicula. No se ha encontrado la pelicula"
          });
      });
  } else {
    movie
      .updateOne({ _id: ObjectId(id) }, { $inc: { vote: -1 } })
      .then(movieUpdated => {
        return res.status(200).json({
          status: true,
          data: null,
          message: "Votacion aceptada",
          movieUpdated
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({
          status: false,
          data: null,
          message: "Error al votar la pelicula"
        });
      });
  }

  next();
});

// Traer populares
router.get("/movie/popular", (req, res, next) => {
  movie
    .find({ vote: { $gte: 6 } })
    .then(movies => {
      if (!movies) {
        return res.status(404).json({
          status: false,
          data: null,
          message: "No hay peliculas populares disponibles"
        });
      }
      return res.status(200).json({
        status: true,
        data: { movies: movies },
        message: "Popular movies founded!"
      });
    })
    .catch(next => {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Error al obtener peliculas populares"
      });
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
        return res.status(404).json({
          status: true,
          data: null,
          message: "No hay peliculas en cartelera"
        });
      }
      return res.status(200).json({
        status: true,
        data: { movies: movies },
        message: null
      });
    })
    .catch(next => {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Error al obtener peliculas"
      });
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
        res.status(200);
        return res.json({
          status: true,
          data: null,
          message: "No hay peliculas para ese actor"
        });
      }
      res.status(200);
      return res.json({
        status: true,
        data: { actorMovies: actorMovies },
        message: null
      });
    })
    .catch(next => {
      res.status(400);
      return res.json({
        status: false,
        data: null,
        message: "Error al obtener peliculas"
      });
    });
});

module.exports = router;
