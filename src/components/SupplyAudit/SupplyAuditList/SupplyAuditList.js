import React, {Component, PropTypes} from 'react';
import { Table, Row, Col, Input, Form, Select, Button ,Popconfirm} from 'jcloudui';
import SupplyTable from '../SupplyTable/SupplyTable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { adoptSupply } from '../SupplyTable/redux';
import { supplyAuditSearch,saveFormData } from '../SupplyAuditSearch/redux';
import  BaseComponent  from '../../Common/BaseComponent';
var uuid = 0;
@connect(
  state => ({
    SupplyAuditSearch:state.supplyAuditSearch,
    AdoptSupply:state.adoptSupply
  }),
  dispatch => bindActionCreators({supplyAuditSearch,saveFormData,adoptSupply}, dispatch),
  null,{withRef:true}
)
export default class SupplyAuditList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.check = [];
    this.initCheck = false;
  }

  static propTypes = {
    SupplyAuditSearch: PropTypes.object.isRequired,
    supplyAuditSearch: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
  };

  componentWillMount() {
    var initialValue={platformId:this.platformId,userId:1111,pageSize:this.props.pageSize,pageNum:1};
    this.props.saveFormData(initialValue);
    this.props.supplyAuditSearch(initialValue).then(
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
          供货价
        </Col>
        <Col span={2}>
          销量
        </Col>
        <Col span={3}>
          申请时间
        </Col>
        <Col span={3}>
          供应商
        </Col>
        <Col span={3}>
          商品运营
        </Col>
        <Col span={3}>
          操作
        </Col>
      </Row>,
    heigth: 10,
    dataIndex: 'title'}];
  }

  //解析第一层数组
  createData(){
    var dataSource = new Array();
    var supplyAuditSearchResult = this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data &&this.props.SupplyAuditSearch.data.data.result;
    var test = supplyAuditSearchResult && supplyAuditSearchResult.map((supply,index)=>{
        ++uuid;
        var data = { key: uuid, title: <SupplyTable data={supply} refresh={ ()=>{this.refreshList()}}
                                                    check={this.check[index]} ref={"subcomponent"+index}/>};
        dataSource.push(data);
      });

    return dataSource;
  }
  createPagination(){
    var total = this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data && this.props.SupplyAuditSearch.data.data.totalCount;
    var current = this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data && this.props.SupplyAuditSearch.data.data.pageNum;
    var pageSize = this.props.pageSize;

    return {
      total:total,
      current:current,
      pageSize:pageSize,
      onChange:(pageNumber)=>this.onChangePage(pageNumber)
    };
  }
  onChangePage(pageNumber){
    var searchData = this.props.SupplyAuditSearch.searchdata && this.props.SupplyAuditSearch.searchdata.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.supplyAuditSearch(pageChange).then(
      (result)=>{console.log('PageChange SearchData success')},
      (error)=>{console.log('PageChange SearchData fail')}
    );
  }

  //刷新页面(获取搜索参数，重新查询)
  refreshList(){
    var searchValue = this.props.SupplyAuditSearch.searchdata.searchdata;
    this.props.supplyAuditSearch(searchValue);
  }
  //采纳不采纳方法
  confirm(id,supplyShopId,operation){
    var itemIds = new Array();
    itemIds.push(id);
    var adoptData ={
      platformId:this.platformId,
      userId:2,//测试数据
      itemIds:itemIds,
      supplyShopId:supplyShopId,
      saleStatus:operation
    }
    this.props.adoptSupply(adoptData).then(
      (result)=>{
        message.success(result.msg);
        this.props.refreshList();
      },
      (error)=>{
        message.info("采纳失败！");
        console.log('adoptData fail')}
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
  //批量采纳
  upDateAll(){
    var supplyAuditSearchResult = this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data &&this.props.SupplyAuditSearch.data.data.result;
    var cmp = this.refs;
    let checkState = [];
    for(var key in cmp){
       let data = cmp[key].getWrappedInstance();
       checkState.push(data.state.check)
    }
    console.log(checkState)
    checkState.map((item,index) =>{
         item&&this.confirm(supplyAuditSearchResult[index].itemId,supplyAuditSearchResult[index].supplyShopId,1)
         console.log(sellGoodsSearchResult[index].itemId)
         console.log(sellGoodsSearchResult[index].supplyShopId)
    })
    this.refreshList();
  }
  //批量不采纳
  downDateAll(){
    var supplyAuditSearchResult = this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data &&this.props.SupplyAuditSearch.data.data.result;
    var cmp = this.refs;
    let checkState = [];
    for(var key in cmp){
       let data = cmp[key].getWrappedInstance();
       checkState.push(data.state.check)
    }
    console.log(checkState)
    checkState.map((item,index) =>{
         item&&this.confirm(supplyAuditSearchResult[index].itemId,supplyAuditSearchResult[index].supplyShopId,0)
         console.log(sellGoodsSearchResult[index].itemId)
         console.log(sellGoodsSearchResult[index].supplyShopId)
    })
    this.refreshList();
  }
  render() {
    return(
       <div>
          <div className="tbl-top-action">
            <Button type="primary" onClick={::this.allChecked}>全选</Button>
            <Button type="ghost" style={{marginLeft:10}} onClick={::this.diffChecked}>反选</Button>
            <Popconfirm title="确认批量采纳?" onConfirm={::this.upDateAll} okText="确认" cancelText="取消">
                <Button type="ghost" style={{marginLeft:10}} >批量采纳</Button>
            </Popconfirm>
            <Popconfirm title="确认批量不采纳?" onConfirm={::this.downDateAll} okText="确认" cancelText="取消">
                <Button type="ghost" style={{marginLeft:10}} >批量不采纳</Button>
            </Popconfirm>
          </div>
          <div className="ui-tbl">
            <Table
              columns={this.createColumns()}
              dataSource={this.createData()}
              pagination={this.createPagination()}
              size="middle"
              className="tbl-warp"
            />
          </div>
       </div>
    )
  }
}

