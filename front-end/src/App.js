import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Customers from './components/Customers/Customers';
import MovieForm from './components/MovieForm/MovieForm';
import Movies from './components/Movies/Movies';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';
import Rentals from './components/Rentals/Rentals';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
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
