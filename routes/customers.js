const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 },
  })
);

// Handle displaying all customers
router.get('/', async (req, res) => {
  const customer = await Customer.find().sort({ name: 1 }).select({ name: 1 });
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
router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
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
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res.status(404).send('The customer with the given id was not found');

  res.send(customer);
});

// Update a customer
router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
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

function validateCustomer(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
