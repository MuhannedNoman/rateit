let server;
const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
const moment = require('moment');
const { Movie } = require('../../models/movie');

describe('/api/returns', () => {
  let customerId;
  let movieId;
  let rental;
  let token;
  let movie;

  beforeEach(async () => {
    server = require('../../index');

    token = new User().generateAuthToken();

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    movie = new Movie({
      _id: movieId,
      title: '12345',
      dailyRentalRate: 2,
      genre: { name: '12345' },
      numberInStock: 10,
    });

    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345',
      },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });

  const execute = async () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId, movieId });
  };

  it('should return 401 if client is not logged in', async () => {
    token = '';

    const res = await execute();

    expect(res.status).toBe(401);
  });

  it('should return 400 if customerId is not provided', async () => {
    customerId = '';
    const res = await execute();

    expect(res.status).toBe(400);
  });

  it('should return 400 if movieId is not provided', async () => {
    movieId = '';
    const res = await execute();

    expect(res.status).toBe(400);
  });

  it('should return 404 if no rental found for this customer/movie', async () => {
    await Rental.deleteMany({});

    const res = await execute();

    expect(res.status).toBe(404);
  });

  it('should return 400 if rental is already processed', async () => {
    rental.dateReturned = new Date();
    await rental.save();

    const res = await execute();

    expect(res.status).toBe(400);
  });

  it('should return 200 if rental is a valid request', async () => {
    const res = await execute();

    expect(res.status).toBe(200);
  });

  it('should set return date if input is valid', async () => {
    await execute();

    const rentalFromDatabase = await Rental.findById(rental._id);
    const diff = new Date() - rentalFromDatabase.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it('should calculate the fee correctly', async () => {
    rental.dateOut = moment().add(-7, 'days').toDate();
    await rental.save();

    const res = await execute();

    const rentalFromDatabase = await Rental.findById(rental._id);

    expect(rentalFromDatabase.rentalFee).toBe(14);
  });

  it('should increase the movie stock', async () => {
    const res = await execute();

    const movieFromDatabase = await Movie.findById(movieId);

    expect(movieFromDatabase.numberInStock).toBe(movie.numberInStock + 1);
  });

  it('should return the rental if input is valid', async () => {
    const res = await execute();

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        'dateOut',
        'dateReturned',
        'rentalFee',
        'customer',
        'movie',
      ])
    );
  });
});
