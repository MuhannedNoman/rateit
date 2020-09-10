const request = require('supertest');
const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');
let server;

describe('auth middleware', () => {
  beforeEach(() => {
    server = require('../../index');
  });

  afterEach(async () => {
    await Genre.deleteMany({});
    server.close();
  });

  let token;

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  const execute = () => {
    return request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1' });
  };

  it('should return 401 if no token is provided', async () => {
    token = '';
    const res = await execute();

    expect(res.status).toBe(401);
  });

  it('should return 400 if unvalid token is provided', async () => {
    token = 'a';
    const res = await execute();

    expect(res.status).toBe(400);
  });

  it('should return 200 if  token is provided and valid', async () => {
    const res = await execute();

    expect(res.status).toBe(200);
  });
});
