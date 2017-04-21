import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    TakePasswordOne,
    TakePasswordTwo,
    TakePasswordThree
} from 'containers';

export default (store) => {
  return (
    <Route>
      <Route path="user-shop-view/takepassword/step1" component={TakePasswordOne}/>
      <Route path="sellershop/takepassword/step2" component={TakePasswordTwo}/>
      <Route path="sellershop/takepassword/step3" component={TakePasswordThree}/>
    </Route>
  );
};
