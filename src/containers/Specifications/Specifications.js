/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:specification
 ****************************************************************/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import { push } from 'react-router-redux';
import { Layout, Breadcrumb, Table, Button, Modal, Icon, Popconfirm, Transfer ,Tree, Input, Radio ,InputNumber} from 'jcloudui';
import SpecificationsSearch from 'components/Specification/SpecificationSearch/SpecificationSearch';
import SpecificationsAdd from 'components/Specification/SpecificationAdd/SpecificationAdd';
import SpecificationFuncWrapper from 'components/Specification/SpecificationFuncWrapper/SpecificationFuncWrapper';

import { isLoading, edit, saveEdit, stopUse, move, topBttom } from './redux';
//import CopyTo from 'components/Specification/CopyTo/CopyTo';
import * as speciAction from './redux';
import styles from 'containers/Brand/style/Brand.less';
const { Header, Footer, Sider, Content} = Layout;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;
const styles2 = require('./style/Specifications.less');
const img1 = require('./style/top.png');
const img2 = require('./style/bottom.png');
const img3 = require('./style/down.png');
const img4 = require('./style/up.png');
@connect(
  state => ({
    Specifications: state.specifications,
    specificationSearch: state.specificationSearch
  }),
  dispatch => bindActionCreators({...speciAction}, dispatch)
)
export default class Testchildren extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ifDisplay: false,
      ifEdit: true,
      value: 1,
      visible: false,
      currentRecord: {},
      currentIndex: 0,
      saveData: {}, // 初始数据
      inputAttrName: '',
      inputIndex: '',
      optionStatus: 0,
      optionSaleAttr: 0,
      optionCategoryAttr: 0,
      optionExtendAttr: 0,
      optionselectType: 0,
      updown: true,
      backSu: false, //请求是否回调
      disableCategoryAttr: false,
      disableSelect: false,
    };
    this.state.specificationsSearch = this;
    this.currentIndex2 = 0;
    this.columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '属性名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '',
      key: 'action',
      width: 100,
      render: (record) => (// (text, record) <a href="#" onClick = { ()=>{alert('这是个啥');} }>查看</a>
        <span>
          <i onClick = {()=>{this.top(record);}}><img src = {img1} alt=""/></i>
          <i onClick = {()=>{this.toBottom(record);}}><img src = {img2} alt=""/></i>
          <i onClick = {()=>{this.down(record);}}><img src = {img3} alt=""/></i>
          <i onClick = {()=>{this.up(record);}}><img src = {img4} alt=""/></i>
        </span>
      ),
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: '销售属性',
      dataIndex: 'saleProp',
      key: 'saleProp',
    }, {
      title: '类目属性',
      dataIndex: 'classProp',
      key: 'classProp',
    }, {
      title: '扩展属性',
      dataIndex: 'extendProp',
      key: 'extendProp',
    }, {
      title: '是否复选',
      dataIndex: 'ifCheck',
      key: 'ifCheck',
    }, {
      title: '操作',
      key: 'action2',
      render: (record) => {// (text, record) <a href="#" onClick = { ()=>{alert('这是个啥');} }>查看</a>
        return (
          <span>
          <span type="primary" className={styles2.cli} onClick = {()=>{ this.dis(record);}}>查看</span>
          <span className="ant-divider" />
          <span type="primary" className={styles2.cli} onClick = {()=>{this.edit(record); }}>编辑</span>
          <span className="ant-divider" />
        </span>
        )
      },
      width: '90px'
    }, {
      title: '',
      dataIndex: 'ifStop',
      key: 'ifStop',
    }];
    this.columns2 = [{
      title: '属性值',
      dataIndex: 'propValue',
      key: 'propValue',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
    this.state.data = [];
    this.state.listAllData = [];//当前属性列表所有数据
    this.listData = [];
    this.disData = [];//查看显示数据
    this.attrData = {};//当前属性值
    this.initData = {};
    this.exampledata = [];
    this.ifMove = true; //是否再更新表单
    this.editRecord = {};
    this.userAttrData = []; //用户属性集合
    this.editData = [];
    this.displaied = false;
  }
  top(record) {
    const currentIndex = this.listData.indexOf(record);
    if (+currentIndex === 0 || +this.listData.length === 1) {
      return false;
    }
    let param = {
      platformId: this.exampledata[currentIndex].platformId, //  平台 id
      sortType: '3', // 升序、降序类型(1.上移 2.下移)
      cid: this.exampledata[currentIndex].cid,
      id: this.exampledata[currentIndex].id, // 主键ID
      sort: this.exampledata[currentIndex].sortNumber //序号
    }
    this.props.topBttom(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  toBottom(record) {
    const currentIndex = this.listData.indexOf(record);
    if(+this.listData.length === 1) {
      return false;
    }
    let param = {
      platformId: this.exampledata[currentIndex].platformId, //  平台 id
      sortType: '4', // 升序、降序类型(1.上移 2.下移)
      id: this.exampledata[currentIndex].id, // 主键ID
      sort: this.exampledata[currentIndex].sortNumber, //序号
      cid: this.exampledata[currentIndex].cid,
    }
    this.props.topBttom(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  down(record) {
    const currentIndex = this.listData.indexOf(record);
    if(+this.listData.length === 1) {
      return false;
    }
    let param = {
      platformId: this.exampledata[currentIndex].platformId, //  平台 id
      sortType: '2', // 升序、降序类型(1.上移 2.下移)
      id: this.exampledata[currentIndex].id, // 主键ID
      sort: this.exampledata[currentIndex].sortNumber, //序号
      cid: this.exampledata[currentIndex].cid,
    }
    this.props.move(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  up(record) {
    const currentIndex = this.listData.indexOf(record);
    if(+this.listData.length === 1) {
      return false;
    }
    let param = {
      platformId: this.exampledata[currentIndex].platformId, //  平台 id
      sortType: '1', // 升序、降序类型(1.上移 2.下移)
      id: this.exampledata[currentIndex].id, // 主键ID
      sort: this.exampledata[currentIndex].sortNumber, //序号
      cid: this.exampledata[currentIndex].cid,
    }
    this.props.move(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  // 停用
  st() {
    console.log(this.state.currentIndex,'this.state.currentIndexthis.state.currentIndexthis.state.currentIndex');
    let state = 0;
    if(this.exampledata[this.state.currentIndex].status == 0){
      state = 1;
    }else{
       state = 0;
    }
    let param = {
      platformId: this.exampledata[this.state.currentIndex].platformId, //  平台 id
      attrId: this.exampledata[this.state.currentIndex].attrId, // 属性id
      cid: this.exampledata[this.state.currentIndex].cid,// 类目id
      state:  state
    }
    this.props.stopUse(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  //编辑状态start
  top2(record, ev) {
    //const currentIndex2 = this.currentIndex2;
    const currentIndex2 = this.editData.indexOf(record);
    if(+this.editData.length <= 1 || +currentIndex2 == 0) {
      return false;
    }
    let data2 = [...this.editData];
    data2.unshift(data2.splice(currentIndex2, 1)[0]);
    this.initData.platformCategoryAttributeValues.unshift(this.initData.platformCategoryAttributeValues.splice(currentIndex2, 1)[0]);
    this.editData = data2;
    this.setState({ data2 });
    ev.preventDefault();
    ev.stopPropagation();
  }
  toBottom2(record, ev) {
    const currentIndex2 = this.editData.indexOf(record);
    if(+this.editData.length <= 1 || +currentIndex2 == +this.editData.length - 1) {
      return false;
    }
    let data2 = [...this.editData];
    data2.push(data2.splice(currentIndex2, 1)[0]);
    this.initData.platformCategoryAttributeValues.push( this.initData.platformCategoryAttributeValues.splice(currentIndex2, 1)[0]);
    this.editData = data2;
    this.setState({ data2 });
    ev.preventDefault();
    ev.stopPropagation();
  }
  down2(record, ev) {
    const currentIndex2 = this.editData.indexOf(record);
    if(+this.editData.length <= 1 || +currentIndex2 == +this.editData.length - 1) {
      return false;
    }
    [this.initData.platformCategoryAttributeValues[currentIndex2], this.initData.platformCategoryAttributeValues[currentIndex2+1]] = [this.initData.platformCategoryAttributeValues[currentIndex2+1], this.initData.platformCategoryAttributeValues[currentIndex2]];
    [this.editData[currentIndex2], this.editData[currentIndex2+1]] = [this.editData[currentIndex2+1], this.editData[currentIndex2]];
    this.setState({ data2 : this.editData });
    ev.preventDefault();
    ev.stopPropagation();
  }
  up2(record, ev) {
    //const currentIndex2 = this.currentIndex2;
    const currentIndex2 = this.editData.indexOf(record);
    if(+this.editData.length <= 1 || +currentIndex2 == 0) {
      return false;
    }
    [this.initData.platformCategoryAttributeValues[currentIndex2], this.initData.platformCategoryAttributeValues[currentIndex2-1]] = [this.initData.platformCategoryAttributeValues[currentIndex2-1], this.initData.platformCategoryAttributeValues[currentIndex2]];
    [this.editData[currentIndex2], this.editData[currentIndex2-1]] = [this.editData[currentIndex2-1], this.editData[currentIndex2]];
    this.setState({
      data2 : this.editData,
      ifEdit: false });
    ev.preventDefault();
    ev.stopPropagation();
  }
  deleteData(record) {
    const currentIndex2 = this.editData.indexOf(record);
    let data2 = [...this.editData];
    data2.splice(currentIndex2, 1);
    this.initData.platformCategoryAttributeValues.splice(currentIndex2, 1);
    this.editData = data2;
    this.setState({ data2 });
  }
  addAttr(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let data = {
      key: (+this.editData.length).toString(),
      propValue: <input type="text" defaultValue = {' '} onChange={(e) => {this.change(this.editData.length, e)}} />,
      status: (<RadioGroup onChange={::this.attrChange} defaultValue={1}>
        <Radio value={1}>启用</Radio>
        <Radio value={0}>停用</Radio>
      </RadioGroup>)
    }
    let dataInit = {
      key: (+this.editData.length).toString(),
      attrValueName: ' ',
      status: 1,
      sortNumber: (+this.editData.length + 1).toString(),
      platformId: this.initData.platformId
    }
    this.editData.push(data);
    this.initData.platformCategoryAttributeValues.push(dataInit);
    this.setState({ data2: this.editData },()=>{
      this.handleCancel();
      this.setState({ visible: true });
    });
  }
  change(index, e){
    this.initData.platformCategoryAttributeValues[index].attrValueName = e.target.value;
  }
  attrChange(e) {
    this.initData.platformCategoryAttributeValues[this.currentIndex2].status = e.target.value;
  }
  //编辑状态end
  onChangeStatus(ev) {
    if(+ev.target.value == 1){
      this.state.currentRecord.state= '有效';
    } else {
      this.state.currentRecord.state = '无效';
    }
    this.setState({
      optionStatus: ev.target.value,
    });
  }
  onChangeSaleAttr(ev) {

    if(+ev.target.value == 1){
      this.state.currentRecord.ifCheck= '是';
      this.state.currentRecord.saleProp= '是';
    } else {
      this.state.currentRecord.saleProp = '否';
    }
    if (ev.target.value === 1){
      this.setState({
        optionSaleAttr: ev.target.value,
        disableSelect:true,
        optionselectType: 1,
      });
    }else{
      this.setState({
        optionSaleAttr: ev.target.value
      });
      if(+ev.target.value === 0 && +this.state.optionCategoryAttr === 0 && +this.state.optionExtendAttr === 0) {
        this.setState({
          disableSelect: false
        });
      }
    }
  }
  onChangeCategoryAttr(ev) {
    if(+ev.target.value == 1){
      this.state.currentRecord.ifCheck= '是';
      this.state.currentRecord.classProp = '是';
    } else {
      this.state.currentRecord.classProp = '否';
    }
    if (ev.target.value === 1){
      this.setState({
        optionCategoryAttr: ev.target.value,
        optionselectType: 1,
        disableSelect:true,
        //disableSelect: true
      });
    }else{
      this.setState({
        optionCategoryAttr: ev.target.value,
      });
      if(+this.state.optionSaleAttr === 0 && +ev.target.value === 0 && +this.state.optionExtendAttr === 0) {
        this.setState({
          disableSelect: false
        });
      }
    }
  }
  onChangeExtendAttr(ev) {
    if (+ev.target.value === 1){
      this.state.currentRecord.classProp = '是';
      this.state.currentRecord.ifCheck= '是';
      this.setState({
        optionExtendAttr: ev.target.value,
        optionCategoryAttr: 1,
        optionselectType: 1,
        disableCategoryAttr: true,
        disableSelect: true,
      });
    }else{
      this.setState({
        optionExtendAttr: ev.target.value,
      });
      if(+ev.target.value === 0) {
        this.setState({
          disableCategoryAttr: false,
        });
        if(+this.state.optionSaleAttr === 0 && +this.state.optionCategoryAttr === 0 && +ev.target.value === 0){
          this.setState({
            disableSelect: false,
          });
        }
      }
    }
    if(+ev.target.value == 1){
      this.state.currentRecord.extendProp= '是';
    } else {
      this.state.currentRecord.extendProp = '否';
    }
  }
  onChangeSelectType(ev) {
    if(+ev.target.value == 1){
      this.state.currentRecord.ifCheck= '是';
    } else {
      this.state.currentRecord.ifCheck = '否';
    }
    this.setState({
      optionselectType: ev.target.value,
    });
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  isRepeat(arr){
    var hash = {};
    for(var i in arr) {
    if(hash[arr[i]])
    return true;
    hash[arr[i]] = true;
    }
    return false;
  }
  Trim(str,is_global)    //去除字符串空格
        {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g")
            {
                result = result.replace(/\s/g,"");
             }
            return result;
    }
  handleOk() {
    this.ifMove = true;
    this.initData.attrName = this.state.inputAttrName;
    this.initData.sortNumber = this.state.inputIndex;
    this.initData.status = this.state.optionStatus;
    this.initData.hasSaleAttr = this.state.optionSaleAttr;
    this.initData.hasCategoryAttr = this.state.optionCategoryAttr;
    this.initData.hasExtendAttr = this.state.optionExtendAttr;
    this.initData.selectType = this.state.optionselectType;
    this.setState({ 
      loading: true,
     });
    let attrValueName = [];
    let ifHaveName = false;
    this.initData.platformCategoryAttributeValues.map((item, index) => {
      this.initData.platformCategoryAttributeValues[index].attrValueName = this.Trim(item.attrValueName,'g');
        if(item.attrValueName == null || item.attrValueName == '' || item.attrValueName == ' '){
            ifHaveName = true;
        }else{}
        attrValueName.push(item.attrValueName);
    });
    let ifRepeat = this.isRepeat(attrValueName);
    let message1 = '属性名不能重复';
    let message2 = '属性名不能为空';
    if(ifRepeat){
      this.info(message1);
      return false;
    }else{}
    if(ifHaveName){
      this.info(message2);
      return false;
    }else{}
    let param = {
      platformId: this.initData.platformId, //  平台 id
      platformCategoryAttribute: this.initData
    }
    this.props.saveEdit(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
    /*setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);*/
    this.displaied = false;
    this.setState({ 
      visible: false,
     });
  }
  //查看
  dis(record) {
    this.displaied = true;
    this.editRecord = record;
    const currentIndex = this.listData.indexOf(record);
    if (this.props.specificationSearch.data.result.data[+currentIndex]) {
      const {platformId, attrId, cid } = this.props.specificationSearch.data.result.data[+currentIndex];
      let param = {
        platformId: platformId,//  平台 id
        attrId: attrId,// 属性id
        cid: cid //类目id
      }
      this.props.edit(param).then(
        (result)=>{
          this.disInit();
          this.setState({
            backSu: true,
            optionStatus: this.exampledata[currentIndex].status,
            optionSaleAttr: this.exampledata[currentIndex].hasSaleAttr,
            optionCategoryAttr: this.exampledata[currentIndex].hasCategoryAttr,
            optionExtendAttr: this.exampledata[currentIndex].hasExtendAttr,
            optionselectType: this.exampledata[currentIndex].selectType,
            inputIndex: this.exampledata[currentIndex].sortNumber,
            inputAttrName: this.exampledata[currentIndex].attrName,
          });
        },
        (error)=>{}
      );
      this.setState({ifEdit: true, visible: true, ifDisplay: true});
    }
    else {
      return false;
    }
    Object.assign(this.state.currentRecord, record);
    this.columns2 = [{
      title: '属性值',
      dataIndex: 'propValue',
      key: 'propValue',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
    this.setState({data2: this.disData});
  }
  //编辑
  edit(record) {
    Object.assign(this.state.currentRecord, record);
    const editR = record ? record : this.editRecord;
    if (!this.displaied) {
      this.editData = [];
    }
    else {}
    this.dis(editR);
    this.setState({
      ifEdit: false
    });
    this.columns2 = [{
      title: '属性值',
      dataIndex: 'propValue',
      key: 'propValue',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },  {
      title: '',
      key: 'action',
      width: 100,
      render: (record) => (// (text, record) <a href="#" onClick = { ()=>{alert('这是个啥');} }>查看</a>
        <span>
              <i onClick = {(e)=>{this.top2(record, e);}}><img style={{width: '80%', height: '80%'}} src = {img1} alt=""/></i>
              <i onClick = {(e)=>{this.toBottom2(record, e);}}><img style={{width: '80%', height: '80%'}} src = {img2} alt=""/></i>
              <i onClick = {(e)=>{this.down2(record, e);}}><img style={{width: '80%', height: '80%'}} src = {img3} alt=""/></i>
              <i onClick = {(e)=>{this.up2(record, e);}}><img style={{width: '80%', height: '80%'}} src = {img4} alt=""/></i>
            </span>
      ),
    },
      {
        title: '编辑',
        key: 'edit',
        render: (text, record, index) => {
          return (
            <Popconfirm title="确认删除么?" onConfirm = {()=>{this.deleteData(record);}}>
              <a href="#">删除</a>
            </Popconfirm>
          );
        }
      }];
  }
  handleCancel() {
    this.setState({ visible: false });
    this.ifMove = true;
    this.displaied = false;
  }
  onCellChange = (index, key) => {
    return (value) => {
      const data2 = [...this.state.listAllData];
      data2[index][key] = value;
      this.setState({ data2 });
    };
  }
  require(record, index) {
    this.setState({currentIndex: index});
  }
  require2(record, index) {
    this.currentIndex2 = index;
  }
  inputAttrName(e){
    this.setState({
      inputAttrName: e.target.value
    });
    this.state.currentRecord.name = e.target.value;
  }
  inputIndex(e){
    this.setState({inputIndex: e.target.value});
    this.state.currentRecord.key = e.target.value;
  }
  childComponentCallback(_this){
    this.setState({
      specificationsSearch : _this
    });
  }
  refreshView() {
    this.state.specificationsSearch.resetSubmit();
  }
  disInit() {
    let exampledata2 = {};
    exampledata2 = this.props.Specifications.editData.result;
    this.attrData = exampledata2.data;
    this.disData = [];
    this.editData = [];
    Object.assign(this.initData, this.props.Specifications.editData.result.data);
    if(this.initData.platformCategoryAttributeValues){
      this.initData.platformCategoryAttributeValues.map((item, index)=>{
        this.disData.push({
          key: (index + 1).toString(),
          propValue: item.attrValueName,
          status: +item.status === 1? '启用': '停用'
        })
        this.editData.push({
          key: (index + 1).toString(),
          propValue: <input type="text" defaultValue = {item.attrValueName} onChange={(e) => {this.change(index, e);}} />,
          status: (<RadioGroup  onChange={::this.attrChange} defaultValue={item.status}>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>停用</Radio>
          </RadioGroup>)
        })
      })
    }
    this.ifMove = false;
  }
  listDataInit() {
    this.exampledata =  [];
    this.exampledata = this.props.specificationSearch.data.result.data;
    let newData = [...this.exampledata];
    this.listData = [];
    this.exampledata.map((item, index)=>{
      this.listData.push({
        key: (index + 1).toString(),
        name: newData[index].attrName,
        state: !newData[index].status ? (<span  style={{color:'#e36068'}}>无效</span>): (<span  style={{color:'#81b644'}}>有效</span>),
        saleProp: +newData[index].hasSaleAttr === 1 ? '是': '否',
        classProp: +newData[index].hasCategoryAttr === 1 ? '是': '否',
        extendProp: +newData[index].hasExtendAttr === 1 ? '是': '否',
        ifCheck: +newData[index].selectType === 1 ? '是': '否',
        ifStop: !newData[index].status ? (<Popconfirm title="确认启用么?" onConfirm = {()=>{this.st();}}>
            <a href="#">启用</a>
          </Popconfirm>): (<Popconfirm title="确认停用么?" onConfirm = {()=>{this.st();}}>
            <a href="#">停用</a>
          </Popconfirm>)
      })
    })
  }
  info(msg) {
    Modal.info({
      title: msg,
      content: (
        <div>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
    let { ifDisplay, ifEdit } = this.state;
    if (this.props.specificationSearch.loaded) {
      this.listDataInit();
    }
    if (this.props.Specifications.loaded && this.ifMove && this.props.Specifications.editData) {
      this.disInit();
    }
    return (
      <Layout className = "layout">
        <Content >
          <Breadcrumb style = {{ margin: '12px 0' }}>
            <Breadcrumb.Item >首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>规格参数管理</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.searchWrap}>
            <SpecificationsSearch childComponentCallback = {this.childComponentCallback.bind(this)} />
          </div>
          <SpecificationFuncWrapper platformId="2" onSearch={this.refreshView.bind(this)}></SpecificationFuncWrapper>
          {/*author: haungxiao,此处onSearch，S为大写！！！*/}
          <div style = {{ background: '#fff', minHeight: 280 }}>
            <Table columns = {this.columns} dataSource = {this.listData} pagination = {false} onRowClick = {::this.require}/>
          </div>

        </Content>
        <Modal
          style = {{minWidth: '600px'}}
          visible={this.state.visible}
          title="编辑属性"
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          footer={[
            !ifEdit && (<Button key="submit" type="primary" size="large"  onClick={this.handleOk.bind(this)}>
              保存
            </Button>),
            !ifEdit && <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
            ifDisplay && (<Button key="submit" type="primary" size="large" onClick={()=>{this.edit();}}>编辑</Button>),
            ifDisplay && (<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>关闭</Button>),
            ifDisplay && (<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>关闭</Button>)
          ]}
        >
          <Layout>
            <Sider style = {{background: 'white'}}>
              <ul>
                <li>属性信息</li>
                <li>属性名称：
                  {ifEdit ?
                    (<span>{this.state.currentRecord.name}</span>)
                    : (<input type = 'text'
                              onChange={::this.inputAttrName}
                              value={this.state.currentRecord.name}
                              defaultValue = {this.state.currentRecord.name}
                      />
                    )
                  }
                </li>
                <li>排列序号：{ifEdit ?
                  (<span>{this.state.currentRecord.key}</span>)
                  : (<input type = 'text'
                            onChange={::this.inputIndex}
                            value={this.state.currentRecord.key}
                            defaultValue = {this.state.currentRecord.key}/>)}
                </li>
                <li>属性状态：{ifEdit ?
                  (<span>{this.state.currentRecord.state}</span>)
                  :(<RadioGroup onChange={::this.onChangeStatus}
                                value = {(this.state.currentRecord.state == '有效' || this.state.currentRecord.state == '无效' ) ? (this.state.currentRecord.state == '有效' ? 1 : 0) : (this.state.currentRecord.state.props.children == '有效' ? 1 : 0)}
                                defaultValue={(this.state.currentRecord.state == '有效' || this.state.currentRecord.state == '无效' ) ? (this.state.currentRecord.state == '有效' ? 1 : 0) : (this.state.currentRecord.state.props.children == '有效' ? 1 : 0)}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>停用</Radio>
                  </RadioGroup>)}
                </li>
                <li>销售属性：{ifEdit ? (<span>{this.state.currentRecord.saleProp}</span>)
                  : (<RadioGroup onChange={::this.onChangeSaleAttr} value = {this.state.currentRecord.saleProp == '是' ? 1 : 0} defaultValue={this.state.currentRecord.saleProp == '是' ? 1 : 0}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>停用</Radio>
                  </RadioGroup>)}
                </li>
                <li>类目属性：{ifEdit ? (<span>{this.state.currentRecord.classProp}</span>)
                  : (<RadioGroup onChange={::this.onChangeCategoryAttr} disabled = {this.state.disableCategoryAttr}  value = {this.state.currentRecord.classProp == '是' ? 1 : 0} defaultValue={this.state.currentRecord.classProp == '是' ? 1 : 0}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>停用</Radio>
                  </RadioGroup>)}
                </li>
                <li>扩展属性：{ifEdit ? (<span>{this.state.currentRecord.extendProp}</span>)
                  : (<RadioGroup onChange={::this.onChangeExtendAttr} value = {this.state.currentRecord.extendProp == '是' ? 1 : 0} defaultValue={this.state.currentRecord.extendProp == '是' ? 1 : 0}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>停用</Radio>
                  </RadioGroup>)}
                </li>
                <li>是否复选：{ifEdit ? (<span>{this.state.currentRecord.ifCheck}</span>)
                  : (<RadioGroup onChange={::this.onChangeSelectType} disabled = {this.state.disableSelect}  value = {this.state.currentRecord.ifCheck == '是'? 1 : 0} defaultValue={this.state.currentRecord.ifCheck == '是'? 1 : 0}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>停用</Radio>
                  </RadioGroup>)}
                </li>
              </ul>
            </Sider>
            <Content>
              <Header style = {{background: 'white', height: 'auto', padding: 0, lineHeight: '35px'}}>属性值
                {!ifEdit && <Button style = {{float: 'right',marginRight: '10px'}} onClick = {(e)=>{this.addAttr(e);}} type="primary">添加</Button>}
              </Header>
              <Content>
                {this.state.listAllData && <Table style = {{textAlign: 'center', width: '100%'}} className = {styles2.tableSecond}  columns = {this.columns2} dataSource = {ifEdit ? this.disData: this.editData} pagination={false} scroll={{ y: 240 }} />}
              </Content>
            </Content>
          </Layout>
        </Modal>
      </Layout>

    );
  }
}


