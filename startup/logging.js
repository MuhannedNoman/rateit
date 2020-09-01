const env = require('../env');
const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
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

  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: env.DB_CONNECTION_STRING,
  //     level: 'info',
  //   })
  // );
};
