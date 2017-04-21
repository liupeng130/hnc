import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    SupplyAudit,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/" component={App}>
	   <Route path="supply-audit" component={SupplyAudit}/>
	</Route>
  );
};
