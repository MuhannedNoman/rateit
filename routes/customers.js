const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Handle displaying all customers
router.get('/', async (req, res) => {
  const customer = await Customer.find()
    .sort({ name: 1 })
    .select({ name: 1, phone: 1, isGold: 1 });
  res.send(customer);
});

// Handle a route to display a customer by ID
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  // 404 resource not found
  if (!customer)
    return res.status(404).send('The customer with the given id was not found');

  res.send(customer);
});

// Add a new customer
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  // 400 bad request
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  try {
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

// Delete a customer
router.delete('/:id', [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res.status(404).send('The customer with the given id was not found');

  res.send(customer);
});

// Update a customer
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    {
      new: true,
    }
  );

  if (!customer)
    return res.status(404).send('The customer with the given id was not found');

  res.send(genre);
});

module.exports = router;
