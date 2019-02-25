import React, { Component } from 'react';
import './home.css';

import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true, // 是否显示im
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

    return (
      <div>
        Home<br />
        <Link to="/detail">/detail</Link>
        {circle}
        <div className="button-example" onClick={() => this.showOrHide()}>show or hide</div>
      </div>
    );
  }


}

export default Home;
