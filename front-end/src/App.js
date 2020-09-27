import React from 'react';
import Movies from './components/Movies/Movies';

const App = () => {
  return (
    <BrowserRouter>
      <main className="container">
        <Movies />
      </main>
    </BrowserRouter>
  );
};

export default App;
