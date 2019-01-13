import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { GlobalStyle } from './style.js';
import { IcontStyle } from './statics/iconfont/iconfont'
import Header from './common/header'

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle/>
        <IcontStyle />
        <Provider store={store}>
          <Header />
        </Provider>
      </Fragment>
    );
  }
}

export default App;
