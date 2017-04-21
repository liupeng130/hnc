import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    Category,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/" component={App}>
	   <Route path="category" component={Category}/>
	</Route>
  );
};
