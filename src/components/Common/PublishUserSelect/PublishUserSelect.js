/**
 * Created by huangxiao3 on 2017/2/24.
 */
import React, {Component, PropTypes} from 'react';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {publishUserSearch} from './redux';
const listTip = '请选择发布者';
const allowClear = true;
var options=null;
@connect(
  state => ({PublishUserSelect:state.publishUserSelect}),
  dispatch => bindActionCreators({publishUserSearch}, dispatch)
)
export default class PublishUserSelect extends BaseComponent {
  static propTypes = {
    publishUserSearch: PropTypes.func.isRequired,
    PublishUserSelect: PropTypes.object.isRequired,
  };
  constructor(props, context) {
    super(props, context);
  }

  handleChange(publishUserId) {
    let {onChangePublishUserValue} = this.props;
    onChangePublishUserValue(publishUserId);
  }

  //根据品牌生成option
  optionSource() {
    if(this.props.PublishUserSelect.data.data){
      let optionData = this.props.PublishUserSelect.data.data;
      if(optionData && optionData.length > 0){
        options = optionData.map((option) => {
          return (
            <Option key={option.id}>{option.username}</Option>
          );
        });
      }
    }
  }
  componentWillMount() {
    this.props.publishUserSearch({
      platformId: this.platformId,
    });
  }

  render() {
    this.props.PublishUserSelect.loaded && this.optionSource();
    return (
      <Select size="large" style={{ width: 120 }} notFoundContent={listTip} allowClear={allowClear} onChange={(publishUserId)=>this.handleChange(publishUserId)}>
        {options}
      </Select>
    );
  }

}