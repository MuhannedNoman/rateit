const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });

  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ]);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('/GET/:id', () => {
    it('should return a genre with a valid id', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();
      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return a 404 if invalid id is passed', async () => {
      const res = await request(server).get(`/api/genres/1`);

      expect(res.status).toBe(404);
    });

    it('should return a 404 if no genera with the given id is passed', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/genres/${id}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    const execute = async () => {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('should return 400 if client is sending a genre less then 5 characters', async () => {
      name = '1234';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if client is sending a genre more then 50 characters', async () => {
      name = new Array(52).join('a');

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      await execute();

      const genre = await Genre.find({ name: 'genre1' });

      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const res = await execute();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });

  describe('DELET /:id', () => {
    let token;

    beforeEach(() => {
      token = new User({ isAdmin: true }).generateAuthToken();
    });

    const execute = async () => {
      const genre = new Genre({ name: 'genre1' });
      return genre.save();
    };

    it('should throw an 403 if the user is not and admin', async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const genre = await execute();

      const res = await request(server)
        .delete(`/api/genres/${genre._id}`)
        .set('x-auth-token', token);

      expect(res.status).toBe(403);
    });

    it('should remove a genre if a valid id of an existing genre is given', async () => {
      const genre = await execute();

      const res = await request(server)
        .delete(`/api/genres/${genre._id}`)
        .set('x-auth-token', token);

      expect(res.status).toBe(200);
    });

    it('should return a 404 if an unvalid id of a none existing genre is given', async () => {
      const res = await request(server)
        .delete(`/api/genres/${mongoose.Types.ObjectId()}`)
        .set('x-auth-token', token);

      expect(res.status).toBe(404);
    });
  });
});
