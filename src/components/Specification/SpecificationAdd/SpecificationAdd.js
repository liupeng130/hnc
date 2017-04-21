/**
 * Created by huangxiao3
 */
import React, {Component, PropTypes} from 'react';
import {Modal, Button, Layout, Input, Icon, Form, message, InputNumber, Radio } from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
//import * as action from './redux';
import { addNewSpecification } from './redux';
import  BaseComponent  from '../../Common/BaseComponent';
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const RadioGroup = Radio.Group;
const styles = require('./style/SpecificationAdd.less');
let uuid = 1;

@connect(
  state => ({SpecificationAdd: state.specificationAdd,SpecificationSearch:state.specificationSearch,CategoryCascade:state.categoryCascade}),
  dispatch => bindActionCreators({addNewSpecification}, dispatch)
)
@Form.create()
export default class SpecificationAdd extends BaseComponent {
  static propTypes = {
    SpecificationAdd: PropTypes.object.isRequired,
    SpecificationSearch: PropTypes.object.isRequired,
    addNewSpecification: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      categoryDisabled:false,
      selectDisabled: false,
    };
  }

  //保存后关闭
  onclose(){
    debugger;
    if(!this.state.visible) {
      return;
    }
    const loadingStatus = this.props.SpecificationAdd.loading;
    const loadedStatus = this.props.SpecificationAdd.loaded;
    var code = this.props.SpecificationAdd.code;
    var msg = this.props.SpecificationAdd.msg;
    if(code!=null){
      if(!loadingStatus && loadedStatus && code==0){
        const { form } = this.props;
        form.resetFields();
        this.setState({
          visible: false,
        });
        form.resetFields();
        message.info(msg);
        debugger;
        this.props.onSearch();
      }else{
        message.info(msg);
      }
    }
  }

  //显示对话框
  showModal() {
    debugger;
    if(this.props.SpecificationSearch.cid){
      /*for(let x in this.props.CategoryCascade){
        for(let y in this.props.CategoryCascade[x]){
          let data = this.props.CategoryCascade[x][y].data.data;
          for(let z in data){
            if(data[z].cid==this.props.SpecificationSearch.cid ){
              if(data[z].hasLeaf==1 || data[z].hasLeaf=='1'){
                this.setState({
                  visible: true,
                });
              }else{
                message.info("请选择终极类目！");
                return;
              }
            }
          }
        }
      }*/
      this.setState({
        visible: true,
      });
    }else{
      message.info("请选择类目！");
      return;
    }
  }

  //提交表单
  handleOk(e) {
    debugger;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(this.ifRepeat(values)){
          message.warning('属性名不可重复！');
          return;
        }
        this.props.addNewSpecification(values).then(
          (result)=>{this.onclose();},
          (error)=>{message.info('保存失败！');}
        );
      }
    });
  }
  //判断属性值是否有重复 true
  ifRepeat(values) {
    var keys = values.keys;
    var attrNames=[];
    for(var i=0;i<keys.length;++i){
      var index = keys[i];
      //获取数据
      var name1='attrName-'+index;
      //拼装进入数组
      attrNames.push(values[name1]);
    }
    for(var j=0;j< attrNames.length;++j) {
      if (attrNames.indexOf(attrNames[j]) != attrNames.lastIndexOf(attrNames[j])){
        return true;
      }
    };
    return false;
  }

  //取消保存
  handleCancel(e) {
    this.props.form.resetFields();
    this.setState({
      visible: false,
      categoryDisabled:false,
      selectDisabled: false,
    });
  }

  //属性状态 status
  onChangeAttr(event) {
    console.log('radio checked', event.target.value);
    this.props.form.setFieldsValue({
      'platformCategoryAttribute.status': event.target.value,
    });
  }

  //销售属性 hasSaleAttr
  onChangeSale(event) {
    console.log('radio checked', event.target.value);
    this.props.form.setFieldsValue({
      'platformCategoryAttribute.hasSaleAttr': event.target.value,
    });
    this.onDisable();
  }

  //类目属性 hasCategoryAttr
  onChangeCatgory(event) {
    console.log('radio checked', event.target.value);
    this.props.form.setFieldsValue({
      'platformCategoryAttribute.hasCategoryAttr': event.target.value,
    });
    this.onDisable();
  }

  //扩展属性 hasExtendAttr
  onChangeExpand(event) {
    debugger;
    console.log('radio checked', event.target.value);
    let value = event.target.value;
    //扩展属性为1时，类目属性必须为1
    if(value===1) {
      this.setState({
        categoryDisabled: true,
        selectDisabled: true,
      });
      this.props.form.setFieldsValue({
        'platformCategoryAttribute.hasExtendAttr': event.target.value,
        'platformCategoryAttribute.hasCategoryAttr': 1,
      });
    }else{
      this.props.form.setFieldsValue({
        'platformCategoryAttribute.hasExtendAttr': event.target.value,
      });
      this.setState({
        categoryDisabled: false,
      });
    }
    this.onDisable();
  }

  //复选属性
  onChangeCheck(event) {
    console.log('radio checked', event.target.value);
    this.props.form.setFieldsValue({
      'platformCategoryAttribute.selectType': event.target.value,
    });
  }

  //销售属性、类目属性、扩展属性，任意一个为1时，复选属性为1，并置灰
  onDisable(){
    debugger;
    const { form } = this.props;
    var platformCategoryAttribute = form.getFieldValue('platformCategoryAttribute');
    var sale = platformCategoryAttribute.hasSaleAttr;
    var cate = platformCategoryAttribute.hasCategoryAttr ;
    var expand = platformCategoryAttribute.hasExtendAttr;
    if(sale===1 || cate ===1 || expand ===1){
      this.props.form.setFieldsValue({
        'platformCategoryAttribute.selectType': 1,
      });
      this.setState({
        selectDisabled: true,
      });
    }else{
      this.setState({
        selectDisabled: false,
      });
    }
  }

  //inputNumber控件
  onChangeNum(value) {
    var lengthNum = this.props.SpecificationSearch.data.result.data.length;
    debugger;
    console.log('change number');
    var flag = isNaN(value);
    if(!isNaN(value)){
      this.props.form.setFieldsValue({
        'platformCategoryAttribute.sortNumber': value>lengthNum?lengthNum:value,
      });
    }
  }

  //删除属性值
  remove(k) {
    debugger;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  //新增属性
  add() {
    uuid++
    debugger;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  maxNum() {
    if(this.props.SpecificationSearch &&
      this.props.SpecificationSearch.data &&
      this.props.SpecificationSearch.data.result &&
      this.props.SpecificationSearch.data.result.data &&
      this.props.SpecificationSearch.data.result.data.length){
      return this.props.SpecificationSearch.data.result.data.length+1;
    }else{
      return 1;
    }
  }


  inputCheck(event) {
    debugger;
    var inputValue = event.target.value;
    inputValue = inputValue.replace(/\*/g,"");
    inputValue = inputValue.replace(/\?/g,"");
    inputValue = inputValue.replace(/\？/g,"");
    window.setTimeout(()=>{
      this.props.form.setFieldsValue({
        'platformCategoryAttribute.attrName': inputValue,
      });
    },100);
  }

  inputCheck2(k) {
    window.setTimeout(()=>{
      debugger;
      var str = 'attrName-'+k;
      var value = this.props.form.getFieldValue(str);
      var inputValue = value;
      inputValue = inputValue.replace(/\*/g,"");
      inputValue = inputValue.replace(/\?/g,"");
      inputValue = inputValue.replace(/\？/g,"");
      window.setTimeout(()=>{
        this.props.form.setFieldsValue({
          [`attrName-${k}`]: inputValue,
        });
      },100);
    },100);
  }


  render() {
    const maxNum = this.maxNum();
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };
    getFieldDecorator('keys', { initialValue: [] });
    getFieldDecorator('platformId', this.platFormId);
    getFieldDecorator('cid', { initialValue: parseInt(this.props.SpecificationSearch.cid) });
    getFieldDecorator('platformCategoryAttribute',
      { initialValue: [{'attrName':'','platformId':this.platformId,'attrNameType':'0','hasCategoryAttr':'0','hasExtendAttr':'0',
        'hasSaleAttr':'0','sortNumber':{maxNum},'selectType':'0','optionType':'','status':'1','hasBaseAttr':'1','platformCategoryAttributeValues':[]}]
      });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k) => {
      return (
        <FormItem inline required={false} key={k}>
          {getFieldDecorator(`attrName-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入属性值名称！",
            }],
          })(
            <Input placeholder="输入属性值名称" style={{ width: '170px'}} maxLength="200" onBlur={()=>this.inputCheck2(k)}/>
          )}
          {getFieldDecorator(`status-${k}`, {
            initialValue: 1,
          })(
            <RadioGroup>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>停用</Radio>
            </RadioGroup>
          )}
          <Icon className={styles.dynamicbutton} type="close-circle-o" onClick={() => this.remove(k)}/>
        </FormItem>
      );
    });

    return (
      <div>
        <Button type="primary" onClick={()=>{this.showModal();}}>+ 添加新属性</Button>
        <Modal
          width="600px"
          visible={this.state.visible}
          title="添加属性"
          onOk={(e)=>{this.handleOk(e);}}
          onCancel={()=>{this.handleCancel();}}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={()=>{this.handleCancel();}}>
              取消
            </Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={(e)=>{this.handleOk(e)}}>
              保存
            </Button>,
          ]}
        >
          <Form>
            <Layout style={{ padding: '0 0', background: '#fff' }}>
              <Sider width={240} className={styles.rb}>
                <strong>属性信息：</strong>
                <FormItem label="属性名称：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.attrName', {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{ required: true, message: '请输入属性名称！' }],
                  })(
                    <Input size="default" maxLength="20" onBlur={(event)=>this.inputCheck(event)} />
                  )}
                </FormItem>
                <FormItem label="排序编号：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.sortNumber', {
                    initialValue: maxNum,
                    validateTrigger: 'onChange',
                    rules: [{ required: true, message: '请输入排序编号！' }],
                  })(
                    <InputNumber min={1} max={maxNum} defaultValue={maxNum} onChange={(value)=>this.onChangeNum(value)} style={{ width: '130px'}} size="default" />
                  )}
                </FormItem>
                <FormItem label="属性状态：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.status', {
                    initialValue: 1,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeAttr(event)}>
                      <Radio value={1}>启用</Radio>
                      <Radio value={0}>停用</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="销售属性：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.hasSaleAttr', {
                    initialValue: 0,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeSale(event)}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="类目属性：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.hasCategoryAttr', {
                    initialValue: 0,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeCatgory(event)} disabled={this.state.categoryDisabled}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="扩展属性：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.hasExtendAttr', {
                    initialValue: 0,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeExpand(event)}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="是否复选：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.selectType', {
                    initialValue: 0,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeCheck(event)} disabled={this.state.selectDisabled}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Sider>
              <Content style={{ padding: '16px 4px', minHeight: 280 }}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={()=>this.add()} style={{ width: '60%' }}>
                    <Icon type="plus" /> 添加属性值
                  </Button>
                </FormItem>
                {/*不需要显示的*/}
                <FormItem>
                  {getFieldDecorator('platformId',{initialValue: this.platformId})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.platformId',{initialValue: this.platformId})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.hasBaseAttr',{initialValue: 1})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.attrNameType',{initialValue: 1})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.optionType',{initialValue: 1})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.platformCategoryAttributeValues',{initialValue: []})}
                </FormItem>
              </Content>
            </Layout>
          </Form>
        </Modal>
      </div>
    );
  }
}



