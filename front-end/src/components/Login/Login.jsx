import React, { useState } from 'react';

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
        <div className="form-group">
          <label htmlFor="userName">User name</label>
          <input
            autoFocus
            type="text"
            className="form-control"
            onChange={handleChange}
            name="userName"
            id="userName"
            aria-describedby="email"
            value={loginData.account.useName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={loginData.account.password}
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
