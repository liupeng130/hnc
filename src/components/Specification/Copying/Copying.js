import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import { push } from 'react-router-redux';
import {Tree, Modal, Button, Layout, Input, Transfer} from 'jcloudui';
import { Radio, Row, Col } from 'antd';
import  CopyTo2 from './CopyTo2';
import { searchAllITEM , searchAllAttr, copySpecification } from './redux';
const TreeNode = Tree.TreeNode;
const {Header, Content, Footer, Sider} = Layout;
const RadioGroup = Radio.Group;
const styles2 = require('containers/Specifications/style/Specifications.less');
@connect(
  state => ({
    speciCopying: state.speciCopying,
    specificationSearch: state.specificationSearch
  }),
  dispatch => bindActionCreators({ searchAllITEM ,searchAllAttr, copySpecification}, dispatch)
)
export default class Copying extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      visible2: false,
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: []
    };
    this.initData =  [
         {
             "id": 28,
             "attrName": "颜色",
             "platformId": 2,
             "attrId": 1000559,
             "cid": 1000087,
             "hasSaleAttr": 1,
             "hasCategoryAttr": 1,
             "hasBaseAttr": 1,
             "hasExtendAttr": 1,
             "sortNumber": 1,
             "selectType": 1,
             "optionType": 1,
             "features": null,
             "status": 1,
             "attrNameType": 1,
             "created": 1486637094000,
             "modified": "2017-02-10 16:21:16.0",
             "yn": 1,
             "platformCategoryAttributeValues":
             [
                 {
                     "id": null,
                     "platformId": 2,
                     "cid": 1000087,
                     "attrId": 1000559,
                     "attrValueId": 1001259,
                     "sortNumber": null,
                     "created": null,
                     "modified": null,
                     "yn": null,
                     "attrValueName": "红色",
                     "status": 1 ,
                 }
             ]
         },
         {
             "id": 29,
             "attrName": "形状",
             "platformId": 2,
             "attrId": 1000560,
             "cid": 1000087,
             "hasSaleAttr": 1,
             "hasCategoryAttr": 1,
             "hasBaseAttr": 1,
             "hasExtendAttr": 1,
             "sortNumber": 2,
             "selectType": 1,
             "optionType": 1,
             "features": null,
             "status": 1,
             "attrNameType": 1,
             "created": 1486637257000,
             "modified": "2017-02-10 16:21:16.0",
             "yn": 1,
             "platformCategoryAttributeValues":
             [
                 {
                     "id": null,
                     "platformId": 2,
                     "cid": 1000087,
                     "attrId": 1000560,
                     "attrValueId": 1001260,
                     "sortNumber": null,
                     "created": null,
                     "modified": null,
                     "yn": null,
                     "attrValueName": "长方形",
                     "status": 1
                 }
             ]
         },
         {
             "id": 31,
             "attrName": "等级",
             "platformId": 2,
             "attrId": 1000562,
             "cid": 1000087,
             "hasSaleAttr": 1,
             "hasCategoryAttr": 1,
             "hasBaseAttr": 1,
             "hasExtendAttr": 1,
             "sortNumber": 4,
             "selectType": 1,
             "optionType": 1,
             "features": null,
             "status": 1,
             "attrNameType": 1,
             "created": 1486637425000,
             "modified": "2017-02-10 16:18:13.0",
             "yn": 1,
             "platformCategoryAttributeValues":
             [
                 {
                     "id": null,
                     "platformId": 2,
                     "cid": 1000087,
                     "attrId": 1000562,
                     "attrValueId": 1001264,
                     "sortNumber": null,
                     "created": null,
                     "modified": null,
                     "yn": null,
                     "attrValueName": "一级1",
                     "status": 1
                 },
                 {
                     "id": null,
                     "platformId": 2,
                     "cid": 1000087,
                     "attrId": 1000562,
                     "attrValueId": 1001265,
                     "sortNumber": null,
                     "created": null,
                     "modified": null,
                     "yn": null,
                     "attrValueName": "二级1",
                     "status": 1
                 }
             ]
         }
     ]; //初始化的数据
    this.submitData = []; //提交的数据
    this.changeData = [];
    this.changeInit = [];
    this.treeData = []
  }
  // 弹出框显示与隐藏start
  showModal() {
    this.setState({
      visible: true,
      visible2: false,
    });
  }
  showModal2() {
    this.setState({
      visible2: true,
      visible: false,
    });
  }
  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
      visible2: false,
    });
    console.log(this.props.speciCopying,'this.props.speciCopying.attrAllData;this.props.speciCopying.attrAllData;');
    let param = {
      platformId: this.props.specificationSearch.data.result.data[0].platformId,
      targetCID: this.props.speciCopying.attrAllData,
      //[1000087],
        categoryAttributeLists: this.submitData
      }
    this.props.copySpecification(param);
  }
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
      visible2: false,
    });
    this.props.callbackParent();
  }
  // 弹出框显示与隐藏end
  // 全选属性 复选属性 start
  onCheck(info){
    this.setState({
      expandedKeys: info,
      checkedKeys: info
    });
    this.submitData = [];
    info.map((item,index) => { //item每个要查找的字段
      this.initData.map((item2, index2)=>{ //item2 数组对象每项
        if(item2.attrName == item && +this.submitData.indexOf(item2) === -1) {
            this.submitData.push(item2);
            if(item2.platformCategoryAttributeValues) {
              item2.platformCategoryAttributeValues.map((item3, index3) =>{
                this.changeInit[index2].platformCategoryAttributeValues[index3].ifCheck = 1;
              });
            }
        }else{
            if (item2.platformCategoryAttributeValues !== undefined) {
            item2.platformCategoryAttributeValues.map((item3, index3) => { //item3 每个子对象里的东西
              if(item3.attrValueName == item) {
                if(this.submitData.indexOf(item2) == -1){
                  this.submitData.push(this.changeInit[index2]);
                }
                this.changeInit[index2].platformCategoryAttributeValues[index3].ifCheck = 1;
                }
            });
          }
        }
      });
    });
  }
  onSelect(info) {
    this.setState({
      expandedKeys: info,
      checkedKeys: info
    });

  }
  allSelect(info) {
    let arr = [];
    this.initData.map((item,index) => {
        arr.push(item.attrName);
    });
    this.setState({
      expandedKeys: arr,
      checkedKeys: arr
    });
    this.onCheck(arr);
  }
  notSelect(){
    this.setState({
      expandedKeys: [],
      checkedKeys: []
    });
    const arr = [];
    this.onCheck(arr);
  }
  handleNext() {
    this.setState({
      visible: false,
      visible2: true,
    });
   let param = {
      platformId: this.props.specificationSearch.data.result.data[0].platformId, //2
      cid: this.props.specificationSearch.data.result.data[0].cid //1000087
    }
    this.props.searchAllAttr(param);
    this.initData =  this.props.speciCopying.searchData;
  }
  handlePrev() {
    this.setState({
      visible: true,
      visible2: false,
    });
  }
  handleCopyTo(){
        this.setState({
          visible: true,
          visible2: false,
        });
        let param = {
          platformId: this.props.specificationSearch.data.result.data[0].platformId,//2
        };
        this.props.searchAllITEM(param).then(
          (result)=>{
           this.treeData = this.props.speciCopying.itemData
          },
          (error)=>{}
        );
        //this.props.speciCopying.itemData.data;
  }
  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    this.setState({
      expandedKeys: sourceSelectedKeys,
    });
  }
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.key} />;
    });
    if(this.props.speciCopying.loaded) {
      this.initData = this.props.speciCopying.searchData.data;
    }
    this.changeInit = this.initData;
    const state = this.state;
    const initData2 = [];
    if (this.initData) {
      const i = 0;
      this.initData.map((item,index) => {
        let children = [];
        if(item.platformCategoryAttributeValues !== undefined)
        {
          children = [];
          item.platformCategoryAttributeValues.map((item,index2) => {
              children.push({
                key: item.attrValueName,
                title:  index + '-' +index2,
              });
          });
        }
        initData2.push({
          key: item.attrName,
          title: index.toString(),
          children: children
        });
      });
    }
    else {

    }
    this.initData && this.initData.map((item2, index2) => {
      this.changeData[index2] = [];
    });
    return (
      <div>
        <Button key="copying" size="large" onClick={()=>{this.handleCopyTo();}} style = {{float: 'right'}}>复制到</Button>
        <Modal style = {{minHeight: '400px'}} title="复制规格参数"
               visible={this.state.visible}
               onOk={()=>{this.handleOk();}}
               onCancel={()=>{this.handleCancel();}}
               footer={[
                 <Button style = {{margin: '0 auto'}} key="submit" type="primary" size="large" loading={this.state.loading} onClick={()=>{this.handleNext();}}>
                   下一步
                 </Button>,
               ]}
        >
        <CopyTo2 itemData={this.props.speciCopying.itemData ? this.props.speciCopying.itemData.data : []}></CopyTo2>
        </Modal>
        <Modal style = {{minHeight: '400px'}} title="选择拷贝属性"
               visible={this.state.visible2}
               onOk={()=>{this.handleOk();}}
               onCancel={()=>{this.handleCancel();}}
               footer={[
                 <Button key="back" type="ghost" size="large" onClick={()=>{this.handlePrev();}}>上一步</Button>,
                 <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={()=>{this.handleOk();}}>
                   保存
                 </Button>,
               ]}
        >
          <p style = {{marginBottom: '10px'}}>选择拷贝属性</p>
          <Button type="primary" onClick={()=>{this.allSelect();}}>全选</Button>
          <Button style = {{marginLeft: '10px'}} type="primary" onClick={::this.notSelect}>反选</Button>
           {initData2.length>0 &&
          <Tree
            checkable
            expandedKeys = {this.state.expandedKeys}
            checkedKeys = {this.state.checkedKeys}
            selectedKeys={this.state.selectedKeys}
            onSelect={::this.onSelect}
            onCheck={ ::this.onCheck}
            onExpand={::this.handleSelectChange}
          >
            {loop(initData2)}
          </Tree>
          }
        </Modal>
      </div>
    );
  }
}
