/**
 * Created by huangxiao3 on 2017/2/17.
 */

import React, {Component, PropTypes} from 'react';
import {initialize} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { supplyAuditSearch,saveFormData } from './redux';
import {  Row, Col, Input, Form, Select, Button } from 'jcloudui';
import CategoryCascade from '../../Common/Category/CategoryCascade';
import BrandSelect from '../../Common/BrandSelect/BrandSelect';
import OperatorSelect from '../../Common/OperatorSelect/OperatorSelect';
import  BaseComponent  from '../../Common/BaseComponent';
const Option = Select.Option;
const FormItem = Form.Item;

@connect(
  state => ({SupplyAuditSearch:state.supplyAuditSearch}),
  dispatch => bindActionCreators({supplyAuditSearch,saveFormData}, dispatch)
)
@Form.create()
export default class SupplyAuditSearch extends BaseComponent {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    SupplyAuditSearch: PropTypes.object.isRequired,
    supplyAuditSearch: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
  };

  //form submit function
  handleSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //保存搜索数据
        this.props.saveFormData(values);
        this.props.supplyAuditSearch(values).then(
          (result)=>{console.log('SearchData success')},
          (error)=>{console.log('SearchData fail')}
        );
      }
    });
  }

  /**
   * 获取最终选择的平台类目id
   * @param value
   */
  handleCategoryChange (value) {
    this.props.form.setFieldsValue({
      'itemSupplyAuditVo.cid': value
    });
  }

  /**
   * 获取最终选择的品牌id
   * @param value
   */
  handleBrandSelectChange (value) {
    console.log(value);
    this.props.form.setFieldsValue({
      'itemSupplyAuditVo.brandId': value
    });
  }


  handleOperatorSelectChange (value) {
    console.log(value);
    this.props.form.setFieldsValue({
      'operatorId': value
    });
  }


  render() {
    //form bind
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('platformId', { initialValue: this.platformId });
    getFieldDecorator('userId', { initialValue: 1111 });

    getFieldDecorator('cid', { initialValue: null });
    getFieldDecorator('brandId', { initialValue: null });
    getFieldDecorator('itemId', { initialValue: null });
    getFieldDecorator('itemName', { initialValue: null });
    getFieldDecorator('modelCode', { initialValue: null });
    getFieldDecorator('barCode', { initialValue: null });
    getFieldDecorator('productCode', { initialValue: null });
    getFieldDecorator('operatorId', { initialValue: null });

    /*getFieldDecorator('pageVo', { initialValue:
      {'totalCount':'','startIndex':'','pageSize':pageSize,'orderField':'','orderType':''}
    });*/

    getFieldDecorator('pageNum', { initialValue: 1 });
    getFieldDecorator('pageSize', { initialValue: this.props.pageSize });
    getFieldDecorator('orderField', { initialValue: null });
    getFieldDecorator('orderType', { initialValue: null });
    //form bind finish

    return(
      <div className="ui-search">
        <Form inline>
          <Row>
            <Col span={22} className="l-content">
              <FormItem label="平台分类：">
                {getFieldDecorator(`cid`, {
                })(
                  <CategoryCascade onChangeCategoryValue={(value)=>this.handleCategoryChange(value)} isShowAllCategory={true} />
                )}
              </FormItem>
              <FormItem label="品牌：">
                {getFieldDecorator(`brandId`, {
                })(
                  <BrandSelect onChangeBrandValue={(value)=>this.handleBrandSelectChange(value)}/>
                )}
              </FormItem>
              <FormItem label="商品名称：">
                {getFieldDecorator(`itemName`, {
                })(
                  <Input style={{ width:120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品库编码：">
                {getFieldDecorator(`itemId`, {
                })(
                  <Input style={{ width:120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品货号：">
                {getFieldDecorator(`productCode`, {
                })(
                  <Input style={{ width:120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品条码：">
                {getFieldDecorator(`barCode`, {
                })(
                  <Input style={{ width:120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品运营：">
                {getFieldDecorator(`operatorId`, {
                })(
                  <OperatorSelect onChangeOperatorValue={(value)=>this.handleOperatorSelectChange(value)}/>
                )}
              </FormItem>
            </Col>
              <Col>
                <div className="r-action">
                  <Button type="primary" size="large" onClick={()=>this.handleSubmit()} style={{ paddingLeft:'20px',paddingRight:'20px'}}>查 询</Button>
                </div>
              </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

