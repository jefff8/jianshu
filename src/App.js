import React, { Component, Fragment } from 'react';
import { GlobalStyle } from './style.js';
import { IcontStyle } from './statics/iconfont/iconfont'
import Header from './common/header'

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle/>
        <IcontStyle />
        <Header />
      </Fragment>
    );
  }
}

export default App;
