import React from 'react';
import './App.css';
import AppRoute from './routing/app-route';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
          <AppRoute />
        </Router>
    </div>
  );
}

export default App;
