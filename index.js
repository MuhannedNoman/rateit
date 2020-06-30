const express = require('express');
const Joi = require('joi');
const genres = require('./routes/genres');

const app = express();

app.use('/api/genres', genres);

// Allow JSON parsing.
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
