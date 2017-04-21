/**
 * @Desc 类目添加form页面
 * @Author ZhengZhiMin
 * @Date 2017-2-6
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Input, Form, Select, Modal, Button, Icon, Col,message,InputNumber} from 'jcloudui';
import {Radio} from 'antd';

import BaseComponent from '../../Common/BaseComponent';

import {submit, getCategoryByPid} from './redux';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


let uuid = 0;

@Form.create({withRef:true})
@connect(
  state => ({categoryAdd:state.categoryAdd}),
  dispatch => bindActionCreators({submit ,getCategoryByPid}, dispatch)
)
export default class CategoryAdd extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {disabled:true};
    this.state.unitVisible = false;
    this.unitJson = {};
    this.keys=[];
  }

  handleRemove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });

    //删除 unitJson
    delete this.unitJson["unit-"+k];
    this.processFormUnit();
  }

  handleAdd(){
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    let keys = form.getFieldValue('keys');
    var addKey = 1;
    if(keys.length>0){
      addKey=keys[keys.length-1]+1;
    }
    let nextKeys = keys.concat(addKey);
    this.keys = nextKeys;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    //增加unitJson
    this.unitJson["unit-"+addKey] = "";
  }


  handleChange(){
    this.setState({
      unitVisible:!this.state.unitVisible
    });

  }

  processUnitValue(e){
    var value = e.target.value;
    var key = e.target.id;
    this.unitJson[key] = value;
    this.processFormUnit();
    return value;
  }

  processFormUnit(){

    //每次 单位修改后 重新渲染 计算出结果 放到 form里
    var temp = "";
    Object.keys(this.unitJson).map((key)=>{
      temp += (this.unitJson[key] +",");
    });
    if(temp.length>1 && temp.indexOf(",")>0){
      temp = temp.substring(0,temp.lastIndexOf(","));
    }
    const {setFieldsValue} = this.props.form;
     setFieldsValue({'unit':temp});
  }


  render(){
    const { getFieldDecorator , getFieldValue } = this.props.form;
    const cid= this.props.categoryAddForm.parentCid;//是否是添加新分类，添加新分类不包含父级分类下拉列表
    let categoryOptions = [];
    if(this.props.categoryAdd.data){
       categoryOptions = this.props.categoryAdd.data.data.map(category => <Option key={category.cid}>{category.categoryName}</Option>);
    }

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    getFieldDecorator('keys', { initialValue: this.keys });

    var keys = getFieldValue('keys');
    //编辑进来的时候 初始化值
    if(this.props.categoryAddForm.cid > 0 && this.props.categoryAddForm.unit){
      keys.concat(this.props.categoryAddForm.unit.split(",").length);
    }



    const formItems = keys.map((k, index) => {
      debugger;
      return (
        <Col span="5">
          <FormItem required={false}  key={k} >
            {getFieldDecorator(`unit-${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "请输入内容或删除此行",
              }],
              getValueFromEvent:this.processUnitValue.bind(this),
              initialValue:this.unitJson["unit-"+k]
            })(
              <Input placeholder="请输入内容" style={{ width: '60', marginRight: 8 }} />
            )}
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.handleRemove(k)}
            />
          </FormItem>
        </Col>
      );
    });

    return (
      <div>
        <Form>
          { getFieldDecorator('parentCid', { initialValue: this.props.categoryAddForm.parentCid})(<Input type="hidden" />)}
          { getFieldDecorator('cid', { initialValue: this.props.categoryAddForm.cid})(<Input type="hidden" />)}
          { getFieldDecorator('lev', { initialValue: this.props.categoryAddForm.lev })(<Input type="hidden" />)}
          { getFieldDecorator('uuid', { initialValue: this.props.categoryAddForm.uuid })(<Input type="hidden" />)}
          { getFieldDecorator('platformId', { initialValue: this.props.categoryAddForm.platformId })(<Input type="hidden" />)}
          { getFieldDecorator('unit', { initialValue: this.props.categoryAddForm.unit})(<Input type="hidden" />)}
          { getFieldDecorator('key', { initialValue: this.props.categoryAddForm.key})(<Input type="hidden" />)}
          {cid&&cid=='-1'?'':
            <FormItem label="父级分类"  {...formItemLayout}>
              {getFieldDecorator('parentCidView', {
                rules: [{ required: true, message: '请选择父级分类' }],
                initialValue:this.props.categoryAddForm.parentCidView
              })(
                <Select>
                  {categoryOptions}
                </Select>
              )}
            </FormItem>
          }

          <FormItem label="分类名称" {...formItemLayout} hasFeedback>
            {getFieldDecorator("categoryName",{rules: [{ required: true, message: '请输入分类名称!' }],initialValue:this.props.categoryAddForm.categoryName})(<Input  placeholder="请输入分类名称"/>)}
          </FormItem>

          <FormItem label="排列序号 " labelCol={{span:4}} wrapperCol={{span:8}} hasFeedback>
            {getFieldDecorator("sortNumber",{rules: [{ required: true, message: '排列序号!' }],initialValue:this.props.categoryAddForm.sortNumber})(<InputNumber min={1} max={1000} placeholder="排列序号" />)}
          </FormItem>

          <FormItem label="关键词" {...formItemLayout} hasFeedback>
            {getFieldDecorator("keyWords",{rules: [{ required: true, message: '请输入关键词' }],initialValue:this.props.categoryAddForm.keyWords})(<Input placeholder="请输入关键词" type="textarea" maxLength="100"/>)}
          </FormItem>
          <FormItem  label="是否终极分类" {...formItemLayout}>
            {getFieldDecorator('hasLeaf',{
              initialValue: this.props.categoryAddForm.hasLeaf})
            (
              <RadioGroup onChange={()=>this.handleChange()}>
                <Radio value={1} disabled={this.state.disabled}>是</Radio>
                <Radio value={0} disabled={this.state.disabled} >否</Radio>
              </RadioGroup>
            )
            }
          </FormItem>
          {this.state.unitVisible==false?"":
          < FormItem label="添加计量单位" labelCol={{ span: 4 }} visible = {false}>
          {formItems}
            <Button onClick={()=>this.handleAdd()}  style={{width: '60'}}>添加</Button>
            </FormItem>
          }
        </Form>
      </div>
    );
  }

  componentWillMount(){
      if(this.props.categoryAddForm.parentCid && this.props.categoryAddForm.parentCid >-1){
        //如果非 一级类目，则获取当前
        this.props.getCategoryByPid(this.props.categoryAddForm.grandCid , this.platformId);
        this.setState({disabled:!this.state.disabled});
      }

      if(this.props.categoryAddForm.unit){
        var  tmp = this.props.categoryAddForm.unit.split(",");
        for(var i=1 ;i<=tmp.length;i++){
          this.unitJson["unit-"+i] = tmp[i-1];
          this.keys.push(i);
        }
      }
      //如果是点击编辑进来且终极节点为true，则出
    if(this.props.categoryAddForm.cid > 0 && this.props.categoryAddForm.hasLeaf==1){
      this.setState({
        unitVisible:true
      });
    }
  }
  componentDidMount(){

  }
}