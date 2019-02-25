import React, { Component } from 'react';
import './home.css';

import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    }
  }

  componentDidMount() {
    window.$http.get('/exchange-rate/list', {}, {

    }).then(res => {
    }, err => {

    })
  }

  showOrHide() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const circle = this.state.show && <div className="yellow-circle"></div>
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );

    return (
      <div>
        Home<br />
        <Link to="/detail">/detail</Link>
        <ul>{listItems}</ul>
        <div className="button-example" onClick={() => this.showOrHide()}>show or hide</div>
        {circle}
      </div>
    );
  }


}

export default Home;
