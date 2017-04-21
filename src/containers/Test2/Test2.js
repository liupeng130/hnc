/**
 * author:liupeng
 * date:2017-02-20
 * description:imageUp
 */
import React, {Component} from 'react';
import {GoodsUp} from 'components';
import { Layout, Menu, Icon, Switch, Dropdown} from 'jcloudui';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
export default class Test2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value :1
    }
  }
  onChange(e) {
    const value = e.target.value;
    this.setState({
      value: value,
    });
  }
  render() {
    return (
      <div className="ui-container">
          <div className="ui-breadcrumb">
               <strong>商品图片</strong>
               <span>（至少添加一张，最多允许十张；单张图片不能大于1M；允许的图片格式有jpg、jpeg、png、JPG、JPEG、PNG）</span>
          </div>
          <div className="ui-ct">
               <GoodsUp/>
          </div>
          <div className="ui-breadcrumb">
              <RadioGroup onChange={this.onChange} value={this.state.value}>
                <strong>SKU图片</strong>
                <Radio value={1}>分别上传</Radio>
                <Radio value={2}>按商品颜色属性上传</Radio>
                <Radio value={3}>按商品容量属性上传</Radio>
              </RadioGroup>
          </div>
      </div>
    );
  }
}