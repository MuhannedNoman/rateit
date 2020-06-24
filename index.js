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

// Handle displaying all genres
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// Handle a route to display a genres by ID
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  // 404 resource not found
  if (!genre)
    return res.status(404).send('The genre with the given id was not found');
  res.send(genre);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
