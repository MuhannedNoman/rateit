const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../env');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
  it('should generate a vaild jwt token', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY);

    expect(decoded).toMatchObject(payload);
  });
});
