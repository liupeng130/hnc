/**
 * Created by songshuangwang on 2017/1/19.
 * 类目管理
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import {CategoryGrid} from 'components';
import {BaseComponent} from 'components';
@connect(
  () => ({}),
{initialize})
export default class Category extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    console.log(this.platFormId)
  }
  handleSubmit() {

  }
  render() {
    return (
      <div >
        <CategoryGrid/>
      </div>
  );
  }
}

