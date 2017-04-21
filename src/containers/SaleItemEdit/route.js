import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  SaleItemEdit,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/" component={App}>
      <Route path="sale-edit" component={SaleItemEdit}/>
    </Route>

  );
};
