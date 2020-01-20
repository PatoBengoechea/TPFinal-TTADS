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
        return res.sendStatus(401);
      }
      return res.json({ actors: actors });
    })
    .catch(next);
});

// Get actor by ID
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  actor
    .findById(id)
    .then(actorById => {
      if (!actorById) {
        return res.sendStatus(401);
      }
      return res.json({ actorById: actorById });
    })
    .catch(next);
});

// Create actor
router.post("/", (req, res, next) => {
  let ac = new actor({
    name: req.body.name,
    nationality: req.body.nationality
  });
  res.send("New actor created succesfully!");
  ac.save()
    .then(doc => {
      console.log(doc).yellow;
    })
    .catch(err => {
      console.log(colors.red("Error saving new actor:", err));
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
        return res.sendStatus(401);
      } else {
        actorToUpdate.name = name;
        actorToUpdate.nationality = nationality;

        // Guardar
        actorToUpdate
          .save()
          .then(doc => {
            console.log(doc).yellow;
            res.send("Actor updated succesfully!");
          })
          .catch(err => {
            console.log("Error updating actor", err).red;
            res.send("Ha ocurrido el siguiente error:", err);
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
    res.sendStatus(200);      
  } catch (error) {
    console.log("Error deleting actor:", error).red;
  }    
  //res.send("delete client:"+id);
  //next();
});

module.exports = router;
