import Joi from 'joi-browser';
import React, { useEffect, useState } from 'react';
import { getGenres } from '../../services/genreService';
import { getMovie, saveMovie } from '../../services/movieService';
import { validateProperty, validateSubmit } from '../Form/FormHelper';
import Input from '../Input';
import Select from './../Select/Select';

const MovieForm = ({ match, history }) => {

  useEffect(() => {
    const fetchGenre = async () => {
      const { data } = await getGenres();
      setGenres([...data]);
    };
    fetchGenre();
  }, []);

  const [genres, setGenres] = useState([]);

  const [movieData, setMovieData] = useState({
    movie: {
      _id: '',
      title: '',
      genreId: '',
      dailyRentalRate: '',
      numberInStock: '',
    },
    errors: {
      _id: '',
      title: '',
      genreId: '',
      dailyRentalRate: '',
      numberInStock: '',
    },
  });



  useEffect(() => {
    if (match.params.id === 'new') return;

    const fetchMovie = async () => {
      try {
        const { data: movie } = await getMovie(match.params.id);
        setMovieData((prevState) => ({
          ...prevState,
          movie: {
            ...prevState.movie,
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
          },
        }));
      } catch (error) {
        if(error.response && error.response.status === 404)
         history.replace('/not-found');
      }
    };  
      
    fetchMovie();
  }, []);

  const { movie, errors } = movieData;

  const Schema = {
    _id: Joi.string().allow(''),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
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

  const handleSubmit = async (e) => {
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
    const newMovie = await saveMovie(movieData.movie);
    if (newMovie) {
      history.push('/movies');
    } else console.log('Error saving movie');
  };

  return (
    <div>
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
          name="genreId"
          label="Genre"
          value={movie.genreId}
          error={errors.genreId}
          onChange={handleChange}
          options={genres}
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

export default MovieForm;
