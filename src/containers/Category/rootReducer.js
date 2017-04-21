import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import session from 'jcloudecc/reducer/session';
import categoryGird from 'components/Category/CategoryGrid/redux';
import brands from 'components/Category/CategoryView/redux';
import categoryAdd from 'components/Category/CategoryAdd/redux';
import categoryCascade from 'components/Common/Category/redux';


export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  session,
  categoryGird,
  brands,
  categoryAdd,
  categoryCascade
})
