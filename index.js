require('express-async-errors');
const express = require('express');
const winston = require('winston');
require('winston-mongodb');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const env = require('./env');

process.on('uncaughtException', (ex) => {
  console.error('We got an uncaught exception');
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({ filename: `logfile.log` }));
winston.add(
  new winston.transports.MongoDB({
    db: env.DB_CONNECTION_STRING,
    level: 'info',
  })
);

if (!env.JWT_SECRET_KEY) {
  console.error('FATAL ERROR: JWT secret key is not defined');
  process.exit(1);
}

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

app.use(error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
