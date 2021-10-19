import React, { useEffect } from 'react';
import './App.css';
import AppRoute from './routing/app-route';
import {BrowserRouter as Router} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchTypes } from './features/types/types.slice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTypes()), [dispatch]);

  return (
    <div className="App">
        <Router>
          <AppRoute />
        </Router>
    </div>
  );
}

export default App;
