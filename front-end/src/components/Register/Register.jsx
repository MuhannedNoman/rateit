import Joi from 'joi-browser';
import React, { useState } from 'react';
import { validateProperty, validateSubmit } from '../Form/FormHelper';
import Input from '../Input';
import { register } from '../../services/userService';
import { loginWithJwt } from '../../services/authService';

const Register = () => {
  const [userState, setUserState] = useState({
    user: { email: '', password: '', name: '' },
    errors: {
      email: '',
      password: '',
      name: '',
    },
  });

  const { user, errors } = userState;

  const Schema = {
    email: Joi.string().email().required().label('Email Address'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().alphanum().min(5).required().label('User Name'),
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    const error = validateProperty(name, value, Schema);

    setUserState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
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
    const errors = validateSubmit(user, Schema);
    setUserState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));
    if (errors) return;
    try {
      const response = await register(user);
      loginWithJwt(response.headers['x-auth-token']);;
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.statue === 400)
        setUserState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            name: ex.response.data,
          },
        }));
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form id="login" onSubmit={handleSubmit}>
        <Input
          name="email"
          value={user.email}
          label="Email Address"
          onChange={handleChange}
          type="email"
          error={errors.email}
        />
        <Input
          name="password"
          value={user.password}
          label="Password"
          onChange={handleChange}
          type="password"
          error={errors.password}
        />
        <Input
          name="name"
          value={user.name}
          label="User Name"
          onChange={handleChange}
          type="text"
          error={errors.name}
        />
        <button
          disabled={validateSubmit(user, Schema)}
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
