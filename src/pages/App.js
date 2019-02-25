import React, { Component } from 'react';
import './App.css';

import AppRouter from '@/router/index.js';

import {
  get,
  post,
  put,
  deleteApi,
  ajax
} from '@/service/apiService.js';

class App extends Component {

  render() {
    // 全局增加http请求
    window.$http = {
      get: get,
      post: post,
      put: put,
      delete: deleteApi,

      ajax: ajax
    };

    return (
      <AppRouter></AppRouter>
    );
  }
}

export default App;
