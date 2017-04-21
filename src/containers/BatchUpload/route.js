import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  BatchUpload,App
} from 'containers';

export default (store) => {
  return (
    <Route path="operating-item-view/batch-upload" component={App}>
	   <Route path="upload" component={BatchUpload}/>
	</Route>
  );
};
