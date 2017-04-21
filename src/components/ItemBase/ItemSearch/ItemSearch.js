/**
 * Created by huangxiao3 on 2017/2/18.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { itemBaseSearch,saveFormData } from './redux';
import {  Row, Col, Input, Form, Select, Button } from 'jcloudui';
import CategoryCascade from '../../Common/Category/CategoryCascade';
import PublishUserSelect from'../../Common/PublishUserSelect/PublishUserSelect'
import OperatorSelect from'../../Common/OperatorSelect/OperatorSelect'
import  BaseComponent  from '../../Common/BaseComponent';
const Option = Select.Option;
const FormItem = Form.Item;

@connect(
  state => ({ItemBaseSearch:state.itemBaseSearch}),
  dispatch => bindActionCreators({itemBaseSearch,saveFormData}, dispatch)
)
@Form.create()
export default class ItemSearch extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }
  static propTypes = {
    ItemBaseSearch: PropTypes.object.isRequired,
    itemBaseSearch: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
    pageSize:PropTypes.object.isRequired
  };

  /**
   * 获取最终选择的平台类目id
   * @param value
   */
  handleCategoryChange (value) {
    this.props.form.setFieldsValue({
      cid: value
    });
  }
  /**
   * 获取发布者id
   * @param value
   */
  onChangePublishUserValue (value) {
    this.props.form.setFieldsValue({
      publishuserId: value
    });
  }
  /**
   * 获取商品运营
   * @param value
   */
  onChangeOperatorValue (value) {
    this.props.form.setFieldsValue({
      operatorId: value
    });
  }


  //form submit function
  handleSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.saveFormData(values);
        this.props.itemBaseSearch(values).then(
          (result)=>{console.log('SearchData success')},
          (error)=>{console.log('SearchData fail')}
        );
      }
    });
  }

  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('platformId', { initialValue: this.platformId });
    getFieldDecorator('userId', { initialValue: 1 });

    getFieldDecorator('cid', { initialValue: null });
    getFieldDecorator('sellerId', { initialValue: null });
    getFieldDecorator('itemName', { initialValue: null });
    getFieldDecorator('itemId', { initialValue: null });
    getFieldDecorator('productCode', { initialValue: null });
    getFieldDecorator('barCode', { initialValue: null });
    getFieldDecorator('operatorId', { initialValue: null });

    getFieldDecorator('pageNum', { initialValue: 1 });
    getFieldDecorator('pageSize', { initialValue: this.props.pageSize });

    return(
      <div className="ui-search">
        <Row>
          <Col span={20} className="l-content">
            <Form inline>
              <FormItem label="平台分类：">
                {getFieldDecorator(`cid`, {
                })(
                  <CategoryCascade onChangeCategoryValue={(value)=>this.handleCategoryChange(value)} isShowAllCategory={true} />
                )}
              </FormItem>
              <FormItem label="发布者：">
                {getFieldDecorator(`publishuserId`, {
                })(
                  <PublishUserSelect onChangePublishUserValue={(value)=>this.onChangePublishUserValue(value)}/>
                  /*<Select size="large" allowClear={true} style={{ width: 120 }}>
                    <Option value="-1">全部</Option>
                    <Option value="20">吴楠</Option>
                    <Option value="2">蔡鸽</Option>
                  </Select>*/
                )}
              </FormItem>
              <FormItem label="商品名称：">
                {getFieldDecorator(`itemName`, {
                })(
                  <Input style={{ width: 120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品库编码：">
                {getFieldDecorator(`itemId`, {
                })(
                  <Input style={{ width: 120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品货号：">
                {getFieldDecorator(`productCode`, {
                })(
                  <Input style={{ width: 120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品条码：">
                {getFieldDecorator(`barCode`, {
                })(
                  <Input style={{ width: 120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品运营：">
                {getFieldDecorator(`operatorId`, {
                })(
                  <OperatorSelect onChangeOperatorValue={(value)=>this.onChangeOperatorValue(value)}/>
                  /*<Select size="large" allowClear={true} style={{ width: 120 }}>
                    <Option value="3">吴楠</Option>
                    <Option value="1">蔡鸽</Option>
                    <Option value="4">海鑫</Option>
                  </Select>*/
                )}
              </FormItem>
            </Form>
          </Col>
          <Col>
            <div className="r-action">
              <Button type="primary" size="large" onClick={()=>this.handleSubmit()} style={{paddingLeft:'20px',paddingRight:'20px'}} >查 询</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

