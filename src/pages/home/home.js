import React, { Component } from 'react';
import './home.css';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        Home<br/>
        <Link to="/detail">/detail</Link>
      </div>
    );
  }
}

export default Home;
