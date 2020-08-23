const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Handle displaying all movies
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort({ name: 1 });
  res.send(movies);
});

// Handle a route to display a movie by ID
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  // 404 resource not found
  if (!movie)
    return res.status(404).send('The movie with the given id was not found');

  res.send(movie);
});

// Add a new movie
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  // 400 bad request
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRenalRate: req.body.dailyRenalRate,
  });

  try {
    await movie.save();
    res.send(movie);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

// Delete movie
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send('The movie with the given id was not found');

  res.send(movie);
});

// Update a movie
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRenalRate: req.body.dailyRenalRate,
    },
    {
      new: true,
    }
  );

  if (!movie)
    return res.status(404).send('The movie with the given id was not found');

  res.send(movie);
});

module.exports = router;
