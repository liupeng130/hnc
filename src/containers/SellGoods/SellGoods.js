import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {Layout, Input, Breadcrumb } from 'jcloudui';
import {SellGoodsSearch,SellGoodsResults} from 'components';
const pageSize = 10;

export default class SellGoods extends Component {
  render() {
    return (
      <div className="ui-container">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>销售商品管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">销售商品管理</div>
          <div className="ui-bd" style={{padding:'16px 16px 40px 16px'}}>
            <SellGoodsSearch pageSize={pageSize}/>
            <div style={{marginTop:'20px'}}>
              <SellGoodsResults pageSize={pageSize} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}