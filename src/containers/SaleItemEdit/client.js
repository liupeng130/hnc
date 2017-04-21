/**
 * Created by huangxiao3 on 2017/3/1.
 */
/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from '../../redux/create';
import ApiClient from '../../helpers/ApiClient';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import getRoutes from './route';
import rootReducer from './rootReducer';
const dest = document.getElementById('content');

const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const store = createStore(_browserHistory, client, window.__data,rootReducer);
const history = syncHistoryWithStore(_browserHistory, store);



const component = (
  <Router render={(props) =>
    <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
  } history={history}>
    {getRoutes(store)}
  </Router>
);

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('../DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}else{
  ReactDOM.render(
    <Provider store={store} key="provider">
      {component}
    </Provider>,
    dest
  );
}

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    //console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
