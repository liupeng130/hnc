/**
 * Created by huangxiao3 on 2017/2/18.
 */
import React, {Component, PropTypes} from 'react';
import { Button,Table,Icon,message } from 'jcloudui';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import { itemBaseSearch,saveFormData } from '../ItemSearch/redux';
import CopyItem from '../CopyItem/CopyItem';
import  BaseComponent  from '../../Common/BaseComponent';

@connect(
  state => ({ItemBaseSearch:state.itemBaseSearch}),
  dispatch => bindActionCreators({itemBaseSearch,saveFormData}, dispatch)
)
export default class ItemList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }
  static propTypes = {
    ItemBaseSearch: PropTypes.object.isRequired,
    itemBaseSearch: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
    pageSize:PropTypes.object.isRequired
  };

  //首次获取数据
  componentWillMount() {
    var initialValue={platformId:this.platformId,pageSize:this.props.pageSize,pageNum:1,userId:1};
    this.props.saveFormData(initialValue);
    this.props.itemBaseSearch(initialValue).then(
      (result)=>{console.log('SearchData success')},
      (error)=>{console.log('SearchData fail')}
    );
  }

  //生成列表数据
  creatData(){
    var dataSource=new Array();
    this.props.ItemBaseSearch && this.props.ItemBaseSearch.data && this.props.ItemBaseSearch.data.data.result.map((col)=>{
      //拼接类目
      var categorys = (col.cname1===null?'':col.cname1)
          +(col.cname2===null?'':'--'+col.cname2)
          +(col.cname3===null?'':'--'+col.cname3)
          +(col.cname4===null?'':'--'+col.cname4);
      var spu = col.id;
      if(col.copyStatus==1){
        spu='(复制)';
      }
      if(col.storeStatus==10){
        spu='(草稿)'
      }
      //生成数据
      var data = {
        copy:col.copyStatus,
        store:col.storeStatus,
        key: col.id,
        spu:spu,
        iteminfo: <div><img src={col.pictureUrl} width="102" height="57"/><span>{col.itemName}</span></div>,
        pulishtime: col.listingTime,
        category: categorys,
        operator: col.publishName,
        action: col.id
      };
      dataSource.push(data);
    });
    return dataSource;
  }

  //生成表头
  createColumns(){
    return [{
      title: '商品库编码',
      dataIndex: 'spu',
      key: 'spu',
      width:'200'
    }, {
      title: '商品信息',
      dataIndex: 'iteminfo',
      key: 'iteminfo',
      width:'300'
    }, {
      title: '发布时间',
      dataIndex: 'pulishtime',
      key: 'pulishtime',
      width:'200'
    }, {
      title: '平台类目',
      dataIndex: 'category',
      key: 'category',
      width:'400'
    }, {
      title: '发布者',
      dataIndex: 'operator',
      key: 'operator',
      width:'200'
    }, {
      title: '操作',
      key: 'action',
      render: (record) => {
        var copyflag = true;
        if(record.copy ==1 || record.store==10){
          copyflag = false
        }
        var editUrl = "http://platform.hnc.jcloudec.com/operating-item-view/edit-goods?itemId="+record.key+'&&edit=1';
        return (
          <span>
            {/*<Link to = {editUrl}>编辑</Link>*/}
            <a href={editUrl}>编辑</a>
            {copyflag && <span className="ant-divider"/>}
            {copyflag && <CopyItem itemid={record.key} refreshList={()=>this.refreshList()}/>}
          </span>
        )
      },
    }];
  }

  //分页查询
  onChangePage(pageNumber){
    console.log("page change:",pageNumber);
    var searchData = this.props.ItemBaseSearch.searchdata.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.itemBaseSearch(pageChange).then(
      (result)=>{console.log('PageChange SearchData success')},
      (error)=>{console.log('PageChange SearchData fail')}
    );
  }

  //生成分页对象
  createPagination(){
    var total = this.props.ItemBaseSearch.data && this.props.ItemBaseSearch.data.data && this.props.ItemBaseSearch.data.data.totalCount;
    var current = this.props.ItemBaseSearch.data && this.props.ItemBaseSearch.data.data && this.props.ItemBaseSearch.data.data.pageNum;

    return {
      total:total,
      current:current,
      pageSize:this.props.pageSize,
      onChange:(pageNumber)=>this.onChangePage(pageNumber)
    };
  }

  //刷新页面(获取搜索参数，重新查询)
  refreshList(){
    var searchValue = this.props.ItemBaseSearch.searchdata.searchdata;
    this.props.itemBaseSearch(searchValue);
  }
  goPublishItem(){
    if(typeof window !== 'undefined'){
      window.location.href = 'http://platform.hnc.jcloudec.com/operating-item-view/goods-release';
    }
  }

  render() {
    return (
      <div>
        <div className="tbl-top-action">
          <Button type="primary" icon="plus" onClick={()=>this.goPublishItem()}>发布商品</Button>
        </div>
        <div className="ui-tbl">
          <Table
            columns={true && this.createColumns()}
            dataSource={true && this.creatData()}
            size="middle"
            pagination={this.createPagination()}
          />
        </div>
      </div>
    )
  }
}