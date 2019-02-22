import React, { Component } from 'react';

import Home from '@/pages/home/home.js';
import Detail from '@/pages/detail/detail.js';

import { BrowserRouter, Route } from 'react-router-dom';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Route exact path="/" component={Home}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/detail" component={Detail}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
