import React, { Component } from 'react';
import './detail.css';

import { Link, Route, Switch } from 'react-router-dom';

import DetailFirst from '@/pages/detailfirst/detailfirst.js';

class Detail extends Component {
  render() {
    return (
      <div>
        Detail <br/>
        <Link to="/home">/home</Link><br/>
        <Link to="/detail/first">/detail/first</Link>
        {/* 子路由 */}
        <Switch>
          <Route path="/detail/first" component={DetailFirst}></Route>
        </Switch>
      </div>
    );
  }
}

export default Detail;
