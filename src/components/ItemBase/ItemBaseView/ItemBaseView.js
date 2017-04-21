/**
 * Created by huangxiao3 on 2017/2/18.
 */
import React, {Component} from 'react';
import {  Row, Col, Input, Form, Select, Button, Breadcrumb } from 'jcloudui';
import ItemList from '../ItemList/ItemList';
import ItemSearch from '../ItemSearch/ItemSearch';
const Option = Select.Option;
const FormItem = Form.Item;
const pageSize = 10;
export default class ItemBaseView extends Component {

  render() {
    return(
      <div className="ui-container">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">商品管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>商品库管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">商品库管理</div>
          <div className="ui-bd" style={{padding:'16px 16px 40px 16px'}} >
            <ItemSearch pageSize={pageSize} />
            <div style={{marginTop:'20px'}}>
              <ItemList pageSize={pageSize} />
            </div>
          </div>
        </div>
      </div>

    )
  }

}