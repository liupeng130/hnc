/**
 * Created by huangxiao3 on 2017/2/27.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {Layout, Input, Breadcrumb } from 'jcloudui';
import {SaleItemView} from 'components';

export default class SaleItemEdit extends Component {
  handleSubmit() {

  }

  render() {
    return (
      <div>
        <SaleItemView />
      </div>
    );
  }
}