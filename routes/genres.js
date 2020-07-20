const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

// Handle displaying all genres
router.get('/', async (req, res) => {
  const geners = await Genre.find().sort({ name: 1 }).select({ name: 1 });
  res.send(geners);
});

// Handle a route to display a genre by ID
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  // 404 resource not found
  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  res.send(genre);
});

// Add a new genre
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  // 400 bad request
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  try {
    genre = await genre.save();
    res.send(genre);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

// Delete genre
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  res.send(genre);
});

// Update a genre
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  res.send(genre);
});

module.exports = router;
