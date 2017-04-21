import React from 'react';
import {Route} from 'react-router';
import {
    App,
    Test,
    Test2,
    NotFound,
    Brand,    //品牌管理
    BrandUpload,    //批量上传
    BrandAdd,
    BrandUp,
    Specifications,
    Category,
    BatchUpload,
    TemplateApp,
    Template,
    IconFontView,
    SellGoods,
    SellGoodsEdit,
    SupplyAudit,  //供货商申请审核
    ItemBase,  //商品库管理
    GoodsRlease,
    SaleItemEdit, //销售商品编辑
  } from 'containers';

import {CategoryAdd} from 'components'
export default () => {
  return (
    <Route>
        <Route path="/test1" component={Test}/>
        <Route path="/test2" component={Test2}/>
        <Route path="/categoryAdd" component={CategoryAdd}/>
        <Route path="/" component={App}>
            <Route path="test" component={Test}/>
            <Route path="brand" component={Brand}/>
            <Route path="brand-upload" component={BrandUpload}/>
            <Route path="brand-add" component={BrandAdd}/>
            <Route path="brand-up" component={BrandUp}/>
            <Route path="specifications" component={Specifications} />
            <Route path="category" component={Category}/>
            <Route path="batch-upload" component={BatchUpload}/>
            <Route path="sell-goods" component={SellGoods}/>
            <Route path="sell-goods-edit" component={SellGoodsEdit}/>
            <Route path="supply-audit" component={SupplyAudit}/>
            <Route path="item-base" component={ItemBase}/>
            <Route path="goods-rlease" component={GoodsRlease}/>

            <Route path="sale-item-edit" component={SaleItemEdit}/>

          </Route>
      <Route component={TemplateApp}>
        <Route path="template" component={Template}/>
        <Route path="iconfont" component={IconFontView}/>
      </Route>

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
