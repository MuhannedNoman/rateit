const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

const env = require('./env');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
