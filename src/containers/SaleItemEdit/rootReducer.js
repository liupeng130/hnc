/**
 * Created by huangxiao3 on 2017/3/1.
 */
import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import session from 'jcloudecc/reducer/session';

//SaleItem 重构 暂时使用 start
import saleItemEdit from 'components/SaleItemEdit/SaleItemView/redux';
import saleItemPriceList from 'components/SaleItemEdit/SaleItemPriceList/redux';
import regionPriceEdit from 'components/SaleItemEdit/RegionPriceEdit/redux'
//SaleItem 重构 暂时使用 end
import areaSupplyerPrice from 'components/SaleItemEdit/AreaSupplyerPrice/redux'
import regionPriceDetail from 'components/SaleItemEdit/RegionPriceDetail/redux'
import supplySeeMore from 'components/SaleItemEdit/SupplySeeMore/redux'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  session,
  

  saleItemEdit,
  saleItemPriceList,
  regionPriceEdit,

  areaSupplyerPrice,

  regionPriceDetail,

  supplySeeMore

})
