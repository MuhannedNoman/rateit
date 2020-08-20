const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('../models/genre');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min: 0, max: 255 },
    dailyRenalRate: { type: Number, min: 0, max: 255, required: true },
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).required(),
    numberInStock: Joi.number().required().min(0),
    dailyRenalRate: Joi.number().min(0).required(),
    genreId: Joi.objectId().required(),
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
