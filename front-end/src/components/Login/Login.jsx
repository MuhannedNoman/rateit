import React, { useState } from 'react';
import Input from '../Input';

const Login = () => {
  const [loginData, setLoginData] = useState({
    account: {
      userName: '',
      password: '',
    },
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginData((prevState) => ({
      account: {
        ...prevState.account,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
  };

  return (
    <div>
      <h1>Login</h1>
      <form id="login" onSubmit={handleSubmit}>
        <Input
          name="userName"
          value={loginData.account.userName}
          label="User Name"
          onChange={handleChange}
          type="text"
        />
        <Input
          name="password"
          value={loginData.account.password}
          label="Password"
          onChange={handleChange}
          type="password"
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
