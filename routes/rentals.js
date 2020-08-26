const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const Mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

Fawn.init(Mongoose);

// Handle displaying all rentals
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

// Handle a route to display a rental by ID
router.get('/:id', async (req, res) => {
  const rental = await Movie.findById(req.params.id);

  // 404 resource not found
  if (!rental)
    return res.status(404).send('The rental with the given id was not found');

  res.send(rental);
});

// Add a new rental
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  // 400 bad request
  if (error) return res.status(400).send(error.details[0].message);

  if (Mongoose.Types.ObjectId.isValid(req.body.customerId))
    return res.status(400).send('Invalid Cistomer Id');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie is out of stock!');

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRenalRate: movie.dailyRenalRate,
    },
  });

  new Fawn.Task()
    .save('rentals', rental)
    .update(
      'movies',
      { _id: movie._id },
      {
        $inc: { numberInStock: -1 },
      }
    )
    .run();

  res.send(rental);
});

// Delete rental
router.delete('/:id', [auth, admin], async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);

  if (!rental)
    return res.status(404).send('The rental with the given id was not found');

  res.send(rental);
});

// Update a rental
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie is out of stock!');

  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRenalRate: movie.dailyRenalRate,
      },
    },
    {
      new: true,
    }
  );

  if (!rental)
    return res.status(404).send('The rental with the given id was not found');

  res.send(rental);
});

module.exports = router;
