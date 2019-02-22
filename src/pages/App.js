import React, { Component } from 'react';
import './App.css';

import AppRouter from '@/router/index.js';
import Home from '@/pages/home/home.js';

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter></AppRouter>
      </div>
    );
  }
}

export default App;
