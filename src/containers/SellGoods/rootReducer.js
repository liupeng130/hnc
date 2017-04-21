/**
 * Created by huangxiao3 on 2017/3/1.
 */
import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import session from 'jcloudecc/reducer/session';


import sellGoodsSearch from 'components/SellGoods/SellGoodsSearch/redux';
import categoryCascade from 'components/Common/Category/redux';
import brandSelect from 'components/Common/BrandSelect/redux';
import updateItembatchShelves from 'components/SellGoods/SellGoodsResults/redux';


export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  session,

  sellGoodsSearch,
  brandSelect,
  categoryCascade,
  updateItembatchShelves,
})
