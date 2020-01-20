// Llamada al módulo de mongoose
const { Schema, model } = require('mongoose');

// Crear schema
const actorSchema = new Schema(
  {
    name: { type: String, required: true },
    nationality: { type: String, required: true }
  },
  { collection: 'actor' }
);

module.exports = model('actor', actorSchema);
