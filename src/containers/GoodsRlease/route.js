import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    GoodsRlease,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/" component={App}>
	   <Route path="goods-release" component={GoodsRlease}/>
	</Route>
  );
};
