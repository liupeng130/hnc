import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {Layout, Input, Breadcrumb,Icon } from 'jcloudui';
import {TemplateSearch,TemplateResults} from 'components';
import './style/iconFontView.css'

export default class template extends Component {
  handleSubmit() {

  }

  render() {
    return (
      <div className="iconfont-list">
        <ul>
          <li>
            <Icon type="xiayi" />
            <p>下移</p>
            <p>xiayi</p>
          </li>
          <li>
            <Icon type="shangyi" />
            <p>上移</p>
            <p>shangyi</p>
          </li>
          <li>
            <Icon type="zhidi" />
            <p>置底</p>
            <p>zhidi</p>
          </li>
          <li>
            <Icon type="zhiding" />
            <p>置顶</p>
            <p>zhiding</p>
          </li>
          <li>
            <Icon type="cgs" />
            <p>采购商管理</p>
            <p>cgs</p>
          </li>
          <li>
            <Icon type="ggcs" />
            <p>规格参数管理</p>
            <p>ggcs</p>
          </li>
          <li>
            <Icon type="fl" />
            <p>分类管理</p>
            <p>fl</p>
          </li>
          <li>
            <Icon type="pp" />
            <p>品牌管理</p>
            <p>pp</p>
          </li>
          <li>
            <Icon type="xx" />
            <p>信息管理</p>
            <p>xx</p>
          </li>
          <li>
            <Icon type="gys" />
            <p>供应商管理</p>
            <p>gys</p>
          </li>
        </ul>
      </div>
    );
  }
}