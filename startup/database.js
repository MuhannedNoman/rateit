const mongoose = require('mongoose');
const env = require('../env');
const winston = require('winston');

module.exports = function () {
  mongoose
    .connect(env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => winston.info('Connected to DB...'));
};
