import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Count from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Count />
  </Provider>,
  document.getElementById('root')
);
