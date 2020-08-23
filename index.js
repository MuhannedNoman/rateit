const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const env = require('./env');

mongoose
  .connect(env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to DB...'))
  .catch((err) => console.log('Couldnot connect to MongoDB', err));

const app = express();

// Allow JSON parsing.
app.use(express.json());

app.use('/api/genres', genres);

app.use('/api/customers', customers);

app.use('/api/movies', movies);

app.use('/api/rentals', rentals);

app.use('/api/users', users);

app.use('/api/auth', auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
