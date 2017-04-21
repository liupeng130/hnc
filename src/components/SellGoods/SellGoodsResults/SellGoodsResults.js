import React, {Component} from 'react';
import {Table, Row, Col, Form, Input, Button, Select,} from 'jcloudui';
import SupplyTable from "../SupplyTable/SupplyTable";
import styles from "./style/SellGoodsResults.css";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { sellGoodsSearch,saveFormData } from '../SellGoodsSearch/redux';
import {updateItembatchShelves} from '../SellGoodsResults/redux';
import  BaseComponent  from '../../Common/BaseComponent';

var uuid = 0;
@connect(
  state => ({
    SellGoodsSearch:state.sellGoodsSearch,
    updateItembatchShelves:state.updateItembatchShelves,
  }),
  dispatch => bindActionCreators({sellGoodsSearch,saveFormData,updateItembatchShelves}, dispatch),
  null,{withRef:true}
)
export default class SellGoodsList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.check = [];
    this.initCheck = false;
  }

  componentWillMount() {
    var initialValue={platformId:this.platformId,userId:1,pageSize:this.props.pageSize,pageNum:1};
    this.props.saveFormData(initialValue);
    this.props.sellGoodsSearch(initialValue).then(
      (result)=>{console.log('SearchData success')},
      (error)=>{console.log('SearchData fail')}
    );
  }
  //生成表头
  createColumns(){
    return [{
      key: 'title',
      title:
      <Row>
        <Col span={6} offset={1}>
          商品信息
        </Col>
        <Col span={3}>
          面价
        </Col>
        <Col span={3}>
          批发价
        </Col>
        <Col span={2}>
          销量
        </Col>
        <Col span={2}>
          发布时间
        </Col>
        <Col span={2}>
          商品运营
        </Col>
        <Col span={2}>
          状态
        </Col>
        <Col span={3}>
          操作
        </Col>
      </Row>,
      height:10,
      dataIndex:'title'}
    ];
  }
  //解析第一层数组
  createData(){
    var dataSource = new Array();
    var sellGoodsSearchResult = this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.result;
    var tmp = sellGoodsSearchResult && sellGoodsSearchResult.map((supply, index) =>{
      ++uuid;
      var data = {key:uuid,
                   title:<SupplyTable  data={supply} refreshList={()=>this.refreshList()} 
                                       check={this.check[index]} ref={"subcomponent"+index} />};
      dataSource.push(data);
    });
    return dataSource;
  }
  createPagination(){
    var total = this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.totalCount;
    var current =this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.pageNum;
    var pageSize =this.props.pageSize;
    return{
      total:total,
      current:current,
      pageSize:pageSize,
      onChange:(pageNumber) =>this.onChangePage(pageNumber)
    };
  }
  onChangePage(pageNumber){
    var searchData = this.props.SellGoodsSearch.searchdata && this.props.SellGoodsSearch.searchdata.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.sellGoodsSearch(pageChange).then(
      (result)=>{console.log('PageChange SearchData success')},
      (error)=>{console.log('PageChange SearchData fail')}
    );
  }
  //刷新页面
  refreshList(){
    var searchValue = this.props.SellGoodsSearch.searchdata.searchdata;
    this.props.sellGoodsSearch(searchValue);
  }
  //上下架方法
  updateItembatchShelves(id,status){
    var itemId = new Array();
    itemId.push(id);
    var param = {itemId:itemId,saleStatus:status,platformId:2};
    this.props.updateItembatchShelves(param).then(
      (result)=>{this.refreshList();}
    );
  }
  //全选
  allChecked(){
    var cmp = this.refs;
    this.initCheck?this.initCheck=false:this.initCheck=true;
    this.check = [];
    for(var key in cmp){
       let data = cmp[key].getWrappedInstance();
       !data.state.check?this.initCheck = true:null;
    }
    console.log(this.initCheck)
    for(var key in cmp){
       this.check.push(this.initCheck)
    }
    console.log(this.check)
    this.refreshList();
  }
  //反选
  diffChecked(){
    var cmp = this.refs;
    this.check = [];
    for(var key in cmp){
       console.log(cmp[key])
       let data = cmp[key].getWrappedInstance();
       data.state.check?data.state.check=false:data.state.check=true;
       this.check.push(data.state.check)
    }
    this.refreshList();
  }
  //批量上架
  upDateAll(){
    var sellGoodsSearchResult = this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.result;
    var cmp = this.refs;
    let checkState = [];
    for(var key in cmp){
       let data = cmp[key].getWrappedInstance();
       checkState.push(data.state.check)
    }
    console.log(checkState)
    checkState.map((item,index) =>{
         item&&this.updateItembatchShelves(sellGoodsSearchResult[index].id,60)
         console.log(sellGoodsSearchResult[index].id)
    })
    this.refreshList();
  }
  //批量下架
  downDateAll(){
    var sellGoodsSearchResult = this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.result;
    var cmp = this.refs;
    let checkState = [];
    for(var key in cmp){
       let data = cmp[key].getWrappedInstance();
       checkState.push(data.state.check)
    }
    console.log(checkState)
    checkState.map((item,index) =>{
         item&&this.updateItembatchShelves(sellGoodsSearchResult[index].id,50)
         console.log(sellGoodsSearchResult[index].id)
    })
    this.refreshList();
  }
  render(){
    return(
      <div>
        <div className="tbl-top-action">
          <Button type="primary" onClick={::this.allChecked}>全选</Button>
          <Button type="ghost" style={{marginLeft:10}} onClick={::this.diffChecked}>反选</Button>
          <Button type="ghost" style={{marginLeft:10}} onClick={::this.upDateAll}>批量上架</Button>
          <Button type="ghost" style={{marginLeft:10}} onClick={::this.downDateAll}>批量下架</Button>
        </div>
        <div className="ui-tbl">
          <Table
            columns={true && this.createColumns()}
            dataSource={true && this.createData()}
            pagination={true && this.createPagination()}
            size="middle"
            className="tbl-warp"
          />
        </div>
      </div>
    )
  }
}
