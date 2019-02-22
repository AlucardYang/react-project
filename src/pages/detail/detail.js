import React, { Component } from 'react';
import './detail.css';

import { Link } from 'react-router-dom';

class Detail extends Component {
  render() {
    return (
      <div>
        Detail
        <Link to="/home">Home</Link>
      </div>
    );
  }
}

export default Detail;
