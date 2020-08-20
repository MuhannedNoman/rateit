const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registerd.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  try {
    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

module.exports = router;
