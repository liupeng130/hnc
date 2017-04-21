import React, {Component} from 'react';
import {initialize} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { sellGoodsSearch,saveFormData } from './redux';
import { Row, Col, Form, Input, Button, Radio, Select } from 'jcloudui';
import CategoryCascade from '../../Common/Category/CategoryCascade';
import BrandSelect from '../../Common/BrandSelect/BrandSelect';
import BaseComponent  from '../../Common/BaseComponent';
const FormItem = Form.Item;
const Option = Select.Option;

@connect(
  state => ({SellGoodsSearch:state.sellGoodsSearch}),
  dispatch => bindActionCreators({sellGoodsSearch,saveFormData}, dispatch)
)
@Form.create()
export default class SellGoodsSearch extends BaseComponent {

  constructor(props, context) {
    super(props, context);
  }

  //form submit function
  handleSubmit(){
    this.props.form.validateFields((err,values) => {
      if(!err){
        this.props.saveFormData(values);
        this.props.sellGoodsSearch(values).then(
          (result)=>{console.log('SearchData success')},
          (error)=>{console.log('SearchData fail')}
        );
      }
    });
  }
  /**
    *获取最终选择的平台类目id
    *@param value
    */
  handleCategoryChange(value){
    this.props.form.setFieldsValue({
      'cid':value
    });
  }
  /**
   * 获取最终选择的品牌id
   * @param value
   */
  handleBrandSelectChange(value){
    this.props.form.setFieldsValue({
      'brandId':value
    })
  }
  render() {
    // form bind
    const {getFieldDecorator, getFieldValue} = this.props.form;
    getFieldDecorator('platformId',{initialValue :this.platformId});
    getFieldDecorator('userId',{initialValue:1});
    getFieldDecorator('cid',{initialValue: null});
    getFieldDecorator('saleStatus',{initialValue: null});
    getFieldDecorator('itemName',{initialValue: null});
    getFieldDecorator('itemId',{initialValue: null});
    getFieldDecorator('productCode',{initialValue: null});
    getFieldDecorator('barCode',{initialValue: null});
    getFieldDecorator('operatorId',{initialValue: null});
    getFieldDecorator('brandId',{initialValue:null});
    getFieldDecorator('pageNum',{initialValue:1});
    getFieldDecorator('pageSize',{initialValue:this.props.pageSize});
    getFieldDecorator('orderField',{initialValue: null});
    getFieldDecorator('orderType',{initialValue: null});

    return (
      <div className="ui-search">
        <Row>
          <Col span={24} className="l-content">
            <Form inline>
              <FormItem label="平台分类：">
                <div>
                  {getFieldDecorator(`cid`,{
                  })(
                    <CategoryCascade onChangeCategoryValue={(value) => this.handleCategoryChange(value)} isShowAllCategory={true} />
                  )}
                </div>
              </FormItem>
              <FormItem label="商品状态：">
                {getFieldDecorator(`saleStatus`,{
                })(
                  <Select size="large" defaultValue="" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value={60}>上架</Option>
                    <Option value={50}>下架</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="商品名称：">
                {getFieldDecorator(`itemName`,{
                })(
                <Input style={{ width: 120 }} />
                )}
              </FormItem>
              <FormItem label="商品库编码：">
                {getFieldDecorator(`itemId`,{
                })(
                <Input style={{ width: 120 }} />
                )}
              </FormItem>
              <FormItem label="商品货号：">
                {getFieldDecorator(`productCode`,{
                })(
                <Input style={{ width: 120 }} />
                )}
              </FormItem>
              <FormItem label="商品条码：">
                {getFieldDecorator(`barCode`,{
                })(
                <Input style={{ width: 120 }} />
                )}
              </FormItem>
              <FormItem label="品牌：">
                <div>
                  {getFieldDecorator(`brandId`,{
                  })(
                    <BrandSelect onChangeBrandValue={(value)=>this.handleBrandSelectChange(value)}/>
                  )}
                </div>
              </FormItem>
              <FormItem label="商品运营：">
                <div>
                  {getFieldDecorator(`operatorId`,{
                  })(
                    <Select size="large" allowClear={true} style={{ width: 120 }}>
                      <Option value="3">吴楠</Option>
                      <Option value="1">蔡鸽</Option>
                      <Option value="4">海鑫</Option>
                    </Select>
                  )}
                </div>
              </FormItem>

              <div className="r-action">
                <Button type="primary" size="large" onClick={()=>this.handleSubmit()} style={{paddingLeft:'20px',paddingRight:'20px'}}>查 询</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}