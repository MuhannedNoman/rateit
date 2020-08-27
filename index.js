require('express-async-errors');
const express = require('express');
const winston = require('winston');
require('winston-mongodb');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();
require('./startup/routes')(app);

require('./startup/database')();

process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: `logfile.log` }));

winston.add(
  new winston.transports.File({
    filename: `uncaughtExceptions.log`,
    handleExceptions: true,
  })
);

winston.add(
  new winston.transports.File({
    filename: `unhandledRejection.log`,
    handleRejections: true,
  })
);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
