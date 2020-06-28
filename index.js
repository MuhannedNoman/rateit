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

// Handle a route to display a genre by ID
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  // 404 resource not found
  if (!genre)
    return res.status(404).send('The genre with the given id was not found');
  res.send(genre);
});

// Add a new genre
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);

  // 400 bad request
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);

  res.send(genre);
});

// Delete genre
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// Update a genre
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
