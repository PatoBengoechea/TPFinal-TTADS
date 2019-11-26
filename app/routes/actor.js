var mongoose = require('mongoose');
var router = require('express').Router();
var actor = mongoose.model('actor');

var ObjectId = mongoose.Types.ObjectId;

// Get all actors
router.get('/', (req, res, next) => {
    actor.find({})
    .then(actors => {
        if(!actor){ return res.sendStatus(401); }
        return res.json({'actors': actors})
    })
    .catch(next);
});

// Get actor by ID
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    actor.findById(id)
        .then( actorById => {
            if(!actorById){ return res.sendStatus(401); }
            return res.json({ 'actorById' : actorById });
        })
        .catch(next);
});

// Create actor
router.post('/', (req, res, next)=>{
    let ac = new actor({
        name: req.body.name,
        nationality: req.body.nationality
    });
    res.send('Se ha creado el nuevo actor !');
    ac.save()
        .then(doc=>{
            console.log(doc)
        })
    .catch(err=>{
        console.log(err)
    })
});

// Update actor
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let name = req.params.name;
    let nationality = req.params.nationality;

    actor.findById(id)
        .then( actorToUpdate => {
            if(!actorToUpdate){ return res.sendStatus(401)}
            else {
                actorToUpdate.name = name;
                actorToUpdate.nationality = nationality;

                // Guardar
                actorToUpdate.save()
                    .then( doc => {
                        console.log(doc);
                        res.send('Actor actualizado !');
                    })
                    .catch( err => {
                        console.log(err);
                        res.send("Ha ocurrido el siguiente error: " +err);
                    });
            }
        })
        .catch(next);
});

// Delete actor
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    actor.findByIdAndRemove(id);
    res.sendStatus(200);
      //res.send("delete client:"+id);
      //next();
  });

module.exports=router;