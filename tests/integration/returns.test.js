let server;
const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

describe('/api/returns', () => {
  let customerId;
  let movieId;
  let rental;
  let token;

  beforeEach(async () => {
    server = require('../../index');

    token = new User().generateAuthToken();

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345',
      },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRenalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
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
});
