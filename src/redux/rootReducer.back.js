import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import { pagination } from 'violet-paginator';

import {reducer as form} from 'redux-form';
import categoryGird from 'components/Category/CategoryGrid/redux';
import brands from 'components/Category/CategoryView/redux';
import brandup from 'components/Brand/BrandUp/redux';
import categoryAdd from 'components/Category/CategoryAdd/redux';
/**** Common start ****/
import categoryCascade from 'components/Common/Category/redux';
import brandSelect from 'components/Common/BrandSelect/redux';
/**** Common end ****/
/**** Specifications start ****/
import specifications from 'containers/Specifications/redux';
import specificationAdd from 'components/Specification/SpecificationAdd/redux';
import specificationSearch from 'components/Specification/SpecificationSearch/redux';
import speciCopying from 'components/Specification/Copying/redux';
/**** Specifications end ****/
/**** Brand start ****/
//所有 Brand 调用的redux全部放到这里
import brandSearch from 'components/Brand/BrandSearch/redux';
import BrandDetail from 'components/Brand/BrandList/redux/BrandDetailRedux';
import BrandDisable from 'components/Brand/BrandList/redux/BrandDisableRedux';
import BrandSave from 'components/Brand/BrandList/redux/BrandSaveRedux';
import getAllCategory from 'components/Brand/GetAllCategory/redux';
/**** Brand end ****/
import supplyAuditSearch from 'components/SupplyAudit/SupplyAuditSearch/redux';
import itemBaseSearch from 'components/ItemBase/ItemSearch/redux';
import copyItem from 'components/ItemBase/CopyItem/redux';
import adoptSupply from 'components/SupplyAudit/SupplyTable/redux';
import sellGoods from 'components/SellGoods/SellGoodsSearch/redux';
import sellGoodsEdit from 'containers/SellGoods/redux';
import regionPrice from 'components/SellGoods/RegionPrice/redux';


//SaleItem 重构 暂时使用 start
import saleItemEdit from 'components/SaleItemEdit/SaleItemView/redux';
import saleItemPriceList from 'components/SaleItemEdit/SaleItemPriceList/redux';
import regionPriceEdit from 'components/SaleItemEdit/RegionPriceEdit/redux'
//SaleItem 重构 暂时使用 end


import session from 'jcloudecc/reducer/session';
import goodsRlease from 'components/GoodsRlease/redux';


export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  session,
  form,
  categoryCascade,
  specifications,
  specificationAdd,
  brandSearch,
  specificationSearch,
  categoryAdd,
  brands,
  speciCopying,
  brandup,
  categoryGird,
  BrandDetail,
  getAllCategory,
  BrandDisable,
  BrandSave,
  brandSelect,
  supplyAuditSearch,
  itemBaseSearch,
  copyItem,
  adoptSupply,
  sellGoodsEdit,
  sellGoods,
  regionPrice,
  goodsRlease,

  saleItemEdit,
  saleItemPriceList,
  regionPriceEdit,
})
