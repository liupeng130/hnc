import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Router, Route, Link } from 'react-router'
import { asyncConnect } from 'redux-async-connect';


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
      <div>C
      <Link to="/aa/takepassword/step1">第一步</Link></div>
    );
  }
}
