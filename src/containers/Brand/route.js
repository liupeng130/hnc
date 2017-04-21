import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    Brand,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/" component={App}>
	   <Route path="brand" component={Brand}/>
	</Route>
  );
};
