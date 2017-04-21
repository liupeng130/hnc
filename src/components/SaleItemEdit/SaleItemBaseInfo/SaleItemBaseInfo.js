/**
 * Created by huangxiao3 on 2017/2/27.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Layout, Breadcrumb } from 'jcloudui';
import styles from './style/SaleItemEdit.less';
import  BaseComponent  from '../../Common/BaseComponent';

export default class SaleItemBaseInfo extends BaseComponent {
  constructor(props,context) {
    super(props,context);
  }

  createData(){
     var sourceData = this.props.SaleItemBaseInfo;
    return (
      <div>
        <h6>规格参数</h6>
        <p><label>平台分类 ：</label>{sourceData && sourceData.cname1} > {sourceData && sourceData.cname2} > {sourceData && sourceData.cname3}  {sourceData && sourceData.cname4 ? ">" : ""} {sourceData && sourceData.cname4}</p>
        <p><label>商品名称 ：</label>{sourceData && sourceData.itemName}</p>
        <p><label>品牌 ：</label>{sourceData && sourceData.brandName}</p>
        <p><label>计量单位 ：</label>{sourceData && sourceData.unit}</p>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.sellGoodsHead}>
        {this.createData()}
      </div>
    );
  }
}