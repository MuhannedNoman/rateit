const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

// Handle displaying all genres
router.get('/', async (req, res, next) => {
  const geners = await Genre.find().sort({ name: 1 }).select({ name: 1 });
  res.send(geners);
});

// Handle a route to display a genre by ID
router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  // 404 resource not found
  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  res.send(genre);
});

// Add a new genre
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  // 400 bad request
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.send(genre);
});

// Delete genre
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  res.send(genre);
});

// Update a genre
router.put('/:id', auth, async (req, res) => {
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
