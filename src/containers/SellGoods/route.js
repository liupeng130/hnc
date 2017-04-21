/**
 * Created by huangxiao3 on 2017/3/2.
 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  SellGoods,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/" component={App}>
      <Route path="sale-item" component={SellGoods}/>
    </Route>
  );
};
