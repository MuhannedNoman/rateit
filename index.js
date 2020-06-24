const express = require('express');
const Joi = require('joi');

const app = express();

// Allo JSON parsing.
app.use(express.json());

const genres = [
  {
    id: 1,
    name: 'Action',
  },
  {
    id: 2,
    name: 'Comdey',
  },
  {
    id: 3,
    name: 'Adventure',
  },
  {
    id: 4,
    name: 'Drama',
  },
];

// Handle API route
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
