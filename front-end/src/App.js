import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customers from './components/Customers';
import Login from './components/Login';
import MovieForm from './components/MovieForm';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Rentals from './components/Rentals';
import Logout from './components/Logout/Logout.';
import ProtectedRoute from './components/ProtectedRoute';
import { getCurrentUser } from './services/authService';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const [currentUser, setCurrentUser] = useState();

  return (
    <Router>
      <ToastContainer />
      <Navbar user={currentUser} />
      <main className="container">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={currentUser} />}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
