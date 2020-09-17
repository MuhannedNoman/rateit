const express = require('express');
const winston = require('winston');
const env = require('./env');
const app = express();

require('./startup/logging')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/api')();
env.ENVIRONMENT_PRODUCTION && require('./startup/prod')(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  winston.info(`Server is listening in port ${PORT}`);
});

module.exports = server;
