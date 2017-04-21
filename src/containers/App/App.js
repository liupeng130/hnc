import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import {Operating} from 'jcloudecc/components';


@asyncConnect([{
  promise: ({store: {}}) => {
    const promises = [];
    return Promise.all(promises);
  }
}])
export default class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    return (
      <Operating >
         {this.props.children}
      </Operating>
    );
  }
}
