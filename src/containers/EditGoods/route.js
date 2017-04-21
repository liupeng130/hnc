import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    EditGoods,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/" component={App}>
	   <Route path="edit-goods" component={EditGoods}/>
	</Route>
  );
};
