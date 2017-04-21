/**
 * Created by huangxiao3 on 2017/2/18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {Layout, Input, Breadcrumb } from 'jcloudui';
import {SupplyAuditView} from 'components';

export default class SupplyAudit extends Component {
  handleSubmit() {

  }

  render() {
    return (
      <div>
        <SupplyAuditView />
      </div>
    );
  }
}