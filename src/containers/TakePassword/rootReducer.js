import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import session from 'jcloudecc/reducer/session';


export default combineReducers({
  routing: routerReducer,
    session,
  reduxAsyncConnect
})
