import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import session from 'jcloudecc/reducer/session';

/**** Common start ****/
import categoryCascade from 'components/Common/Category/redux';
import brandSelect from 'components/Common/BrandSelect/redux';
import publishUserSelect from 'components/Common/PublishUserSelect/redux';
import operatorSelect from 'components/Common/OperatorSelect/redux'
/**** Common end ****/
import supplyAuditSearch from 'components/SupplyAudit/SupplyAuditSearch/redux';
import itemBaseSearch from 'components/ItemBase/ItemSearch/redux';
import copyItem from 'components/ItemBase/CopyItem/redux';
import adoptSupply from 'components/SupplyAudit/SupplyTable/redux';
import sellGoods from 'components/SellGoods/SellGoodsSearch/redux';
import sellGoodsEdit from 'containers/SellGoods/redux';


import goodsEdit from 'containers/EditGoods/redux';
export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  session,

  categoryCascade,

  brandSelect,
  supplyAuditSearch,
  itemBaseSearch,
  copyItem,
  adoptSupply,
  sellGoodsEdit,
  sellGoods,
  publishUserSelect,
  operatorSelect,
  goodsEdit
})
