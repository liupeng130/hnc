/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布
 ****************************************************************/
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { Layout, Menu, Icon, Switch, Dropdown, Tabs, Breadcrumb, Button, Modal} from 'jcloudui';
// import {Footer as IFooter, Header as Iheader} from 'components';
import {Link} from 'react-router';  //链接跳转，相当于a标签
import {GoodsBasic, GoodsIntroduction, GoodsOther, GoodsPicWrapper, GoodsSpec} from '../../components'
import { Radio } from 'antd';
import {getSaleInfo, getBrandInfo, release, getOperatorInfo, getUnitInfo, getPublisherInfo} from 'components/GoodsRlease/redux';
const RadioGroup = Radio.Group;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const TabPane = Tabs.TabPane;
@connect(
  state => ({
    goodsRlease:state.goodsRlease,
  }),
  dispatch => bindActionCreators({go:push,getSaleInfo, getBrandInfo, release, getOperatorInfo, getUnitInfo, getPublisherInfo}, dispatch)
)
export default class GoodsRlease extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      errMSG: ''
    };
    this.initSale = true;
    this.initBrand = true;
    this.url = '';
    this.location = '';
    this.preUrl = '';
    this.saveUrl = '';//保存的URL
    this.edit = '';//从哪过来的编辑
    this.id = null;
    this.ifUse = true; //是否可以保存发布
  }
  callback(key) {
    console.log(key);
  }
  componentWillMount(){
    let param = {
      platformId: 2,
      cid: 1000152
    }
    let param2 = {
      platformId: 2
    }
    if( this.initSale && this.initBrand){
      /*if(this.props.editGoods){
         this.props.getSaleInfo(param).then(
          (result)=>{
            this.initSale = false;
          },
          (error)=>{}
        );
        this.props.getBrandInfo(param).then(
          (result)=>{
            this.initBrand = false;
          },
          (error)=>{}
        );
      }else{}*/
      this.props.getOperatorInfo(param2);
      //this.props.getUnitInfo(param);
      this.props.getPublisherInfo();

    }else{}
    this.location = typeof window !== 'undefined' ? window.location.href : "";
    this.preUrl = typeof document !== 'undefined' ? document.referrer : "";
    let edit = this.getUrlParam(this.location, 'edit');
    this.id = this.getUrlParam(this.location, 'itemId');
   // let edit = 1;
    this.edit = edit;
    this.url = 'item/platform/itemPublish/businessItemPublish';//运营商发布产品
    this.saveUrl = 'item/platform/itemPublish/businessItemSave';//运营商保存产品
    if(edit == 1){
      this.url = 'item/platform/itemPublish/publishItemByEdit'; //商品编辑 发布
      this.saveUrl = 'item/platform/itemPublish/saveItemByBusiness'; //商品编辑 保存
    }else if(edit == 2){
      this.url = 'item/platform/itemPublish/saveItemByAudit'; //审核编辑保存
    }else{
      this.url = 'item/platform/itemPublish/businessItemPublish'; //运营商发布产品
      this.saveUrl = 'item/platform/itemPublish/businessItemSave'; //运营商保存产品

    }
  }
  perfectInfo(){
    let itemPulishVO = this.props.goodsRlease.itemPulishVO;
    if(itemPulishVO.itemName == null || itemPulishVO.itemName == undefined || itemPulishVO.itemName == ''){
        this.info('商品名称不能为空');
        this.ifUse = false;
    }else if(itemPulishVO.cid == null || itemPulishVO.cid == undefined || itemPulishVO.cid == ''){
        this.info('平台分类不能为空');
        this.ifUse = false;
    }else if(itemPulishVO.itemPictureVoList == null || itemPulishVO.itemPictureVoList == undefined || itemPulishVO.itemPictureVoList == [] || itemPulishVO.itemPictureVoList.length <= 0){
        this.info('请您上传商品图片(至少一张)');
        this.ifUse = false;
    }/*else if(itemPulishVO.itemSkuPictureVoList.length != itemPulishVO.itemSkuVoList.length){
        this.info('请您上传商品图片下的SKU图片（每个SKU至少一张）');
        this.ifUse = false;
    }*/else{
      this.ifUse = true;
    }
  }
  info(msg) {
    if(!msg){
      msg = '商品保存失败';
    }else{}
    Modal.info({
      title: '',
      content: (
        <div>
          <p>{msg}</p>
        </div>
      ),
      onOk() {},
    });
  }
  submit(){
    // 当是审核的时候 url = '/itemPublish/saveItemByAudit';
    let itemPulishVO = this.props.goodsRlease.itemPulishVO;
    this.perfectInfo();
    if(this.id){
      itemPulishVO.id = this.id;
    }else{}
    if(this.ifUse){
      let param = {
        platformId: 2,
        userId: -1,
        itemPublishVo: JSON.stringify(itemPulishVO)
      }
      this.props.release(param, this.url).then(
        (result)=>{
          if(this.props.goodsRlease.releasData.code == 0 ){
             if(typeof window !== 'undefined'){
                //window.location.href = this.preUrl;
                window.location.href = 'http://platform.hnc.jcloudec.com/operating-item-view/item-base';
             } else{}
          }else{
            /*this.setState({
              //errMSG: this.props.goodsRlease.releasData.msg,
              errMSG: '商品保存失败',
              visible: true
            });
            debugger;*/
            this.info();
          }
        },
        (error)=>{
            /*this.setState({
              //errMSG: this.props.goodsRlease.releasData.msg,
              errMSG: '商品保存失败',
              visible: true
            });
            debugger;*/
            this.info();
        }
      );
    }else{}
  }
  save(){
     let itemPulishVO = this.props.goodsRlease.itemPulishVO;
     this.perfectInfo();
      if(this.id){
        itemPulishVO.id = this.id;
      }else{}
    if(this.ifUse){
      let param = {
        platformId: 2,
        userId: -1,
        itemPublishVo: JSON.stringify(itemPulishVO)
      }
      this.props.release(param, this.saveUrl).then(
        (result)=>{
          if(this.props.goodsRlease.releasData.code == 0 ){
              if(typeof window !== 'undefined'){
                //window.location.href = this.preUrl;
                window.location.href = 'http://platform.hnc.jcloudec.com/operating-item-view/item-base';
              } else {}
          }else{
            /*this.setState({
              //errMSG: this.props.goodsRlease.releasData.msg,
              errMSG: '商品保存失败',
              visible: true
            });*/
            this.info();
          }
        },
        (error)=>{
            /*this.setState({
              //errMSG: this.props.goodsRlease.releasData.msg,
              errMSG: '商品保存失败',
              visible: true
            });*/
            this.info();
        }
      );
    }else{}

  }
  getUrlParam(url, name) {
        var pattern = new RegExp('[?&]' + name + '\=([^&]+)', 'g');
        var matcher = pattern.exec(url);
        var items = null;
        if (matcher !== null) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            }
            catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                }
                catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
      return (
        <div className="ui-container">
          <div className="ui-breadcrumb">
            <Breadcrumb style = {{ margin: '12px 0' }}>
              <Breadcrumb.Item >首页</Breadcrumb.Item>
              <Breadcrumb.Item>商品管理</Breadcrumb.Item>
              <Breadcrumb.Item>商品发布</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ui-ct">
            <div className="ui-hd">商品发布</div>
            <div className="ui-bd">
            <Tabs defaultActiveKey="1" onChange={::this.callback} style = {{background: 'white'}}>
              <TabPane tab={<span><i style ={{color: '#f04134'}}>*</i>基础信息</span>} key="1"><GoodsBasic editGoods = {this.props.editGoods}></GoodsBasic></TabPane>
              {/*<TabPane tab="基础信息" key="1"><GoodsBasic editGoods = {this.props.editGoods}></GoodsBasic></TabPane>*/}
              <TabPane tab={<span><i style ={{color: '#f04134'}}>*</i>商品图片</span>} key="2"><GoodsPicWrapper editGoods = {this.props.editGoods}></GoodsPicWrapper></TabPane>
              <TabPane tab="规格参数" key="3"><GoodsSpec editGoods = {this.props.editGoods}></GoodsSpec></TabPane>
              <TabPane tab="商品介绍" key="4"><GoodsIntroduction editGoods = {this.props.editGoods}></GoodsIntroduction></TabPane>
              <TabPane tab={<span><i style ={{color: '#f04134'}}>*</i>其它设置</span>} key="5"><GoodsOther editGoods = {this.props.editGoods}></GoodsOther></TabPane>
            </Tabs>
            <Footer style = {{background: 'white', textAlign: 'center '}}>
              <Button type="primary" onClick = {::this.submit}>发布</Button>
              {this.edit != 2 && <Button style = {{marginLeft: '40px'}} type="primary" onClick = {::this.save}>保存</Button>}
              <Button style = {{marginLeft: '40px'}}><a href={this.preUrl}>取消</a></Button>
            </Footer>
            </div>
          </div>
          <Modal title="Basic Modal" visible={this.state.visible}
            onOk={this.handleOk} onCancel={this.handleCancel}
          >
            <p>{this.state.errMSG}</p>
          </Modal>
      </div>
      );
  }
}