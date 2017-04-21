/**
 * Created by huangxiao3 on 2017/2/22.
 */

import React, {Component, PropTypes} from 'react';
import {Modal, Form, message, InputNumber } from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { copyItem } from './redux';
import  BaseComponent  from '../../Common/BaseComponent';
const FormItem = Form.Item;

@connect(
  state => ({CopyItem:state.copyItem}),
  dispatch => bindActionCreators({copyItem}, dispatch)
)
@Form.create()
export default class CopyItem extends BaseComponent {

  static propTypes = {
    CopyItem: PropTypes.object.isRequired,
    copyItem: PropTypes.func.isRequired,
    refreshList: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
  }

  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.copyItem(values).then(
          (result)=>{this.onclose();},
          (error)=>{message.info('复制失败！');}
        );
      }
    });
  }

  onclose(){
    if(!this.state.visible) {
      return;
    }
    const loadingStatus = this.props.CopyItem.loading;
    const loadedStatus = this.props.CopyItem.loaded;
    var code = this.props.CopyItem.data.code;
    var msg = this.props.CopyItem.data.msg;
    if(code!=null){
      if(!loadingStatus && loadedStatus && code==0){
        const { form } = this.props;
        form.resetFields();
        this.setState({
          visible: false,
        });
        form.resetFields();
        message.info(msg);
        this.props.refreshList();
      }else{
        message.info(msg);
      }
    }
  }

  //显示对话框
  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleCancel() {
    //重置form
    const { form } = this.props;
    form.resetFields();
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    getFieldDecorator('platformId', { initialValue: this.platformId });
    getFieldDecorator('copyNum', { initialValue: 1 });
    getFieldDecorator('itemId', { initialValue: this.props.itemid });

    return(
      <a onClick={()=>this.showModal()}>复制
        <Modal title="复制商品"
               visible={this.state.visible}
               onOk={()=>this.handleOk()}
               onCancel={()=>this.handleCancel()}
        >
          <Form>
            <FormItem label="复制商品数量：" {...formItemLayout}>
              {getFieldDecorator('copyNum', {
                initialValue: 1,
              })(
                <InputNumber min={1} max={10} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </a>
    )
  }
}