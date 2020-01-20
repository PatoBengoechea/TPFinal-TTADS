// Llamar al módulo de mongoose
const { Schema, model } = require("mongoose");

// Crear schema
const movieSchema = Schema(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    img_path: { type: String, required: false },
    actors: [{ type: Schema.Types.ObjectId, ref: "actor" }],
    release_date: { type: Date, required: false },
    vote: { type: Number, required: false }
  },
  { collection: "movie" }
);

module.exports = model("movie", movieSchema);
