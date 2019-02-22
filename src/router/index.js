import React, { Component } from 'react';

import Home from '@/pages/home/home.js';

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/home" component={Home}></Route>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
