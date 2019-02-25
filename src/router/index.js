import React, { Component } from 'react';

import Home from '@/pages/home/home.js';
import Detail from '@/pages/detail/detail.js';
import ExchangeRate from '@/pages/exchangerate/exchangerate.js';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/detail" component={Detail}></Route>
          <Route path="/exchange-rate" component={ExchangeRate}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
