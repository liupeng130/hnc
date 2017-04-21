import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    ItemBase,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/" component={App}>
	   <Route path="item-base" component={ItemBase}/>
	</Route>
  );
};
