/*
 * author:ChenQi
 * date:2017-02-10
 * description:specifications search
 */
import React from 'react';
import BaseComponent from '../../Common/BaseComponent';
import { Form, Row, Col, Button, Select, Input, message} from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {specificationSearch,saveFormData} from './redux';
import CategoryCascade from '../../Common/Category/CategoryCascade';

const Option = Select.Option;
const FormItem = Form.Item;
message.config({top: 300, duration: 2,});//设置message的位置和延迟消失时间！

@connect(
  state => ({specificationSearch:state.specificationSearch}),
  dispatch => bindActionCreators({specificationSearch, saveFormData}, dispatch)
)
@Form.create()
export default class SpecificationSearch extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.props.childComponentCallback(this);
  }
  /**
   * 获取最终选择的平台类目id
   * @param value
   */
  handleCategoryChange (value) {
    var valueObj = {cid:value};
    this.props.saveFormData(valueObj);
    this.props.form.setFieldsValue({
      cid: value
    });
  }

  /**
   * 规格参数条件查询
   * @param value
   */
  handleSearch (event) {
    event.preventDefault();
    this.resetSubmit();
  }

  resetSubmit () {
    let values = this.props.form.getFieldsValue();
    values.platformId = this.platformId;
    console.log('收到表单值'+JSON.stringify(values));
    if (values.cid){
      this.props.specificationSearch(JSON.parse(JSON.stringify(values)));
      this.props.saveFormData(values);
    }else {
      message.warning("请选择最终类目");
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="ui-search">
        <Row>
          <Col span={24} className="l-content">
            <Form inline onSubmit={(e)=>this.handleSearch(e)}>
              <FormItem label="平台分类">
                <CategoryCascade onChangeCategoryValue={(value)=>this.handleCategoryChange(value)} />
              </FormItem>
              <FormItem label="状态">
                {getFieldDecorator('state', {
                  initialValue: '',
                })(
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="1">有效</Option>
                    <Option value="0">无效</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('cid')(
                  <Input type='hidden' />
                )}
              </FormItem>
              <div className="r-action">
                <Button type="primary" size="large" icon="search" htmlType="submit">查 询</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}