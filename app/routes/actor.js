const mongoose = require("mongoose");
const { Router } = require('express');
const router = Router();

var actor = require('../models/actor');
var colors = require("colors");

var ObjectId = mongoose.Types.ObjectId; // no se usa?

// Get all actors
router.get("/", (req, res, next) => {
  actor
    .find({})
    .then(actors => {
      if (!actor) {
        return res.json({status: false, data: null, message: "No hay actores cargados"})
      }
      return res.json({ status: true, data: {actors: actors}, message: null });
    })
    .catch(next => {
      return res.json({status: false, data: null, message: "Ha ocurrido un error al realizar la peticion"})
    })
});

// Get actor by ID
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  actor
    .findById(id)
    .then(actorById => {
      if (!actorById) {
        return res.json({status: false, data: null, message: "Recurso no disponible"})
      }
      return res.json({status: true, data:{ actorById: actorById }, message: null });
    })
    .catch(next => {
      res.json({status: false, data: null, message: "Ha ocurrido al realizar una peticion"})
    });
});

// Create actor
router.post("/", (req, res, next) => {
  let ac = new actor({
    name: req.body.name,
    nationality: req.body.nationality
  });
  ac.save()
    .then(doc => {
      return res.json({status: true, data: {result: "Actor cargado"}, message: "No hay actores cargados"})
    })
    .catch(err => {
      res.json({status: false, data: null, message: "No hay actores cargados"})
    });
});

// Update actor
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let name = req.params.name;
  let nationality = req.params.nationality;

  actor
    .findById(id)
    .then(actorToUpdate => {
      if (!actorToUpdate) {
        console.log("Actor not found").yellow;  
        return res.json({status: false, data: null, message: "No se ha encontrado el actor"})
      } else {
        actorToUpdate.name = name;
        actorToUpdate.nationality = nationality;

        // Guardar
        actorToUpdate
          .save()
          .then(doc => {
            console.log(doc).yellow;
            return res.json({status: true, data: {result: "Actor modificado"}, message: null})
          })
          .catch(err => {
            return res.json({status: false, data: null, message: "Error al modificar un actor"})
          });
      }
    })
    .catch(next);
});

// Delete actor
router.delete("/:id", (req, res, next) => {
  try {
    let id = req.params.id;
    actor.findByIdAndRemove(id);
    return res.json({status: true, data: {result: "Actor eliminado"}, message: null})
  } catch (error) {
    return res.json({status: false, data: null, message: "Error al eliminar actor"})
  }    
  //res.send("delete client:"+id);
  //next();
});

module.exports = router;
