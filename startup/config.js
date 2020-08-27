const env = require('../env');

module.exports = function () {
  if (!env.JWT_SECRET_KEY) {
    throw new Error('FATAL ERROR: JWT secret key is not defined');
  }
  if (!env.DB_CONNECTION_STRING) {
    throw new Error('FATAL ERROR: DB connection is not defined');
  }
};
