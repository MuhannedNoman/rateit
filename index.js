const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/api')();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  winston.info(`Server is listening in port ${PORT}`);
});
