const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const genres = require('./routes/genres');

const env = require('./env');

mongoose
  .connect(env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB...'))
  .catch((err) => console.log('Couldnot connect to MongoDB', err));

const app = express();

app.use('/api/genres', genres);

// Allow JSON parsing.
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
