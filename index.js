const express = require('express');
const winston = require('winston');
const cors = require('cors');
const env = require('./env');
const app = express();

app.use(cors());

require('./startup/logging')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/api')();
env.ENVIRONMENT_PRODUCTION && require('./startup/prod')(app);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  winston.info(`Server is listening in port ${PORT}`);
});

module.exports = server;
