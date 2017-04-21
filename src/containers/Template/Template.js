import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {Layout, Input, Breadcrumb } from 'jcloudui';
import {TemplateSearch,TemplateResults} from 'components';

export default class template extends Component {
  handleSubmit() {

  }

  render() {
    return (
      <div className="ui-container">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">商品管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>品牌管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">品牌管理</div>
          <div className="ui-bd">
            <TemplateSearch />
            <div style={{marginTop:'20px'}}>
              <TemplateResults />
            </div>
          </div>
        </div>
      </div>
    );
  }
}