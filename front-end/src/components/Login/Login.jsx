import Joi from 'joi-browser';
import React, { useState } from 'react';
import { validateProperty, validateSubmit } from '../Form/FormHelper';
import Input from '../Input';
const Login = () => {
  const [loginData, setLoginData] = useState({
    account: {
      userName: '',
      password: '',
    },
    errors: {
      userName: '',
      password: '',
    },
  });

  const { account, errors } = loginData;

  const Schema = {
    userName: Joi.string().required().label('User Name'),
    password: Joi.string().required().label('Password'),
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    const error = validateProperty(name, value, Schema);

    setLoginData((prevState) => ({
      ...prevState,
      account: {
        ...prevState.account,
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
    const errors = validateSubmit(account, Schema);
    setLoginData((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));
    if (errors) return;
  };

  return (
    <div>
      <h1>Login</h1>
      <form id="login" onSubmit={handleSubmit}>
        <Input
          name="userName"
          value={account.userName}
          label="User Name"
          onChange={handleChange}
          type="text"
          error={errors.userName}
        />
        <Input
          name="password"
          value={account.password}
          label="Password"
          onChange={handleChange}
          type="password"
          error={errors.password}
        />
        <button
          disabled={validateSubmit(account, Schema)}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
