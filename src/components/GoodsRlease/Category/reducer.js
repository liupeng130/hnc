import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import session from 'jcloudecc/reducer/session';
/**** Common start ****/
import categoryCascade from './redux';
/**** Common end ****/
export default combineReducers({ 
  routing: routerReducer,
  reduxAsyncConnect,
  session,
  categoryCascade,
})
