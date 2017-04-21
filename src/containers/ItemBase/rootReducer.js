import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import session from 'jcloudecc/reducer/session';

import {reducer as form} from 'redux-form';
/**** Common start ****/
import categoryCascade from 'components/Common/Category/redux';
import brandSelect from 'components/Common/BrandSelect/redux';
import publishUserSelect from 'components/Common/PublishUserSelect/redux';
import operatorSelect from 'components/Common/OperatorSelect/redux'
/**** Common end ****/

import itemBaseSearch from 'components/ItemBase/ItemSearch/redux';
import copyItem from 'components/ItemBase/CopyItem/redux';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  session,

  itemBaseSearch,
  brandSelect,
  categoryCascade,
  publishUserSelect,
  operatorSelect,
  copyItem,
})
