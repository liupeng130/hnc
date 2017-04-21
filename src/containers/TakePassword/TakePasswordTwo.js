import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Router, Route, Link } from 'react-router'

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()));
    // }
    return Promise.all(promises);
  }
}])

export default class TakePasswordOne extends Component {
  
  render() {
    
    return (
      <div>B
      <Link to="/aa/takepassword/step3">下一步</Link>
      </div>
    );
  }
}
