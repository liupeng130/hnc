import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Router, Route, Link } from 'react-router'
import {connect} from 'react-redux';
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()));
    // }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({session:state.session})
)
export default class TakePasswordOne extends Component {
  constructor(props,context) {
    super(props,context);
  }
  render() {
    debugger;
    return (
      <div>A
      <Link to="/aa/takepassword/step2">下一步</Link>
      </div>
    );
  }
}
