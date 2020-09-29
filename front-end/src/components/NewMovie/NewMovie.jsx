import Joi from 'joi-browser';
import React, { useState } from 'react';
import { getGenres } from '../../services/fakeGenreService';
import { validateProperty, validateSubmit } from '../Form/FormHelper';
import Input from '../Input';
import Select from './../Select/Select';

const NewMovie = ({ history }) => {
  const [movieData, setMovieData] = useState({
    movie: {
      title: '',
      genre: '',
      dailyRentalRate: '',
      numberInStock: '',
    },
    errors: {
      title: '',
      genre: '',
      dailyRentalRate: '',
      numberInStock: '',
    },
  });

  const { movie, errors } = movieData;

  const Schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    dailyRentalRate: Joi.number().max(10).min(0).required().label('Rate'),
    numberInStock: Joi.number()
      .max(100)
      .min(0)
      .required()
      .label('Number in Stock'),
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    const error = validateProperty(name, value, Schema);

    setMovieData((prevState) => ({
      ...prevState,
      movie: {
        ...prevState.movie,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: error,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateSubmit(movie, Schema);
    setMovieData((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));
    if (errors) return;
    history.push('/movies');
  };

  return (
    <div>
      {console.log(movieData)}
      <h1>Movie Form</h1>
      <form id="addMovie" onSubmit={handleSubmit}>
        <Input
          name="title"
          value={movie.title}
          label="Title"
          onChange={handleChange}
          type="text"
          error={errors.title}
        />
        <Select
          name="genre"
          label="Genre"
          value={movie.genre}
          error={errors.genre}
          onChange={handleChange}
          options={getGenres()}
        />
        <Input
          name="numberInStock"
          value={movie.numberInStock}
          label="Number in Stock"
          onChange={handleChange}
          type="text"
          error={errors.numberInStock}
        />
        <Input
          name="dailyRentalRate"
          value={movie.dailyRentalRate}
          label="Rate"
          onChange={handleChange}
          type="text"
          error={errors.dailyRentalRate}
        />
        <button
          disabled={validateSubmit(movie, Schema)}
          type="submit"
          className="btn btn-primary"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewMovie;