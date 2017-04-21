/**
 * Created by huangxiao3 on 2017/2/17.
 */
import {Link} from 'react-router';
import React, {Component, PropTypes} from 'react';
import { Table, Row, Col, Popconfirm, message ,Checkbox} from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { adoptSupply } from './redux';
import SkuTable from '../SkuTable/SkuTable';
import  BaseComponent  from '../../Common/BaseComponent';
@connect(
  state => ({AdoptSupply:state.adoptSupply}),
  dispatch => bindActionCreators({adoptSupply}, dispatch),
  null,{withRef:true}
)
export default class SupplyTable extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      check: false
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    AdoptSupply: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
  };

  //采纳确认框
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
        this.props.refresh();
      },
      (error)=>{
        message.info("采纳失败！");
        console.log('adoptData fail')}
    );
  }

  //初始化的数据
  componentWillMount(){
      this.setState({
         check:this.props.check
      });
  }
  //生成表头
  createColumns(){
    var columns = new Array();
    var isNew = this.props.data.saleStatus===20 && this.props.data.storeStatus===20;
    var columnsUnit = {
      title:
        <Row>
           <Col span={1}>
                <Checkbox  
                    checked={this.state.check}
                    onChange={::this.onChange}
                >
                </Checkbox>
          </Col>
          <Col span={3}>
            商品编码：{this.props.data.itemId}
          </Col>
          <Col span={6} offset={2}>
            平台类目：{this.props.data.firstCategoryName}/{this.props.data.secondCategoryName}/{this.props.data.thirdCategoryName}/{this.props.data.fourthCategoryName}
          </Col>
          <Col span={4} offset={8}>
            {isNew?(<span>供应商申请的新发布商品</span>):(<span>供应商申请供货的商品</span>)}
          </Col>
        </Row>,
        dataIndex: 'title',
        key: 'title'
    };
    columns.push(columnsUnit);
    return columns;
  }
  //多选框改变
  onChange(e){
      console.log(e.target.checked)
      this.setState({
         check:e.target.checked
      });
  }
  //生成表数据行（1行）
  createSpuData(){
    var spuList=new Array();
    var spuData = this.props.data;
    var spuDataUnit=[{
      key: spuData.itemId,
      title:
        <Row type="flex" justify="space-around" align="middle">
          {/*商品信息*/}
          <Col span={6}>
            <div className="table-goods">
              <div className="tg-img">
                <img width="57" height="57" src={spuData.pictureUrl} />
              </div>
              <div className="tg-txt">
                {spuData.itemName}
              </div>
            </div>
          </Col>
          {/*供货价*/}
          <Col span={3}>
            {spuData.minSupplyPrice}-{spuData.maxSupplyPrice}
          </Col>
          {/*销量*/}
          <Col span={2}>
            {spuData.saleNum===null?0:spuData.saleNum}
          </Col>
          {/*申请时间*/}
          <Col span={3}>
            {spuData.createdStr}
          </Col>
          {/*供应商*/}
          <Col span={3}>
            {spuData.supplySellerName}
          </Col>
          {/*商品运营*/}
          <Col span={3}>
            {spuData.operatorName}
          </Col>
          {/*操作*/}
          <Col span={3}>
            <div>
              {this.props.data.saleStatus===20 && this.props.data.storeStatus===20?<a href={"http://platform.hnc.jcloudec.com/operating-item-view/edit-goods?itemId" + spuData.itemId + '&&edit=2'}>编辑</a>:''}
              {this.props.data.saleStatus===20 && this.props.data.storeStatus===20?<span className="ant-divider"/>:''}
              <Popconfirm title="确认采纳?" onConfirm={()=>this.confirm(spuData.itemId,spuData.supplyShopId,1)} okText="确认" cancelText="取消">
                <a> 采纳 </a>
              </Popconfirm>
              <span className="ant-divider"/>
              <Popconfirm title="确认不采纳?" onConfirm={()=>this.confirm(spuData.itemId,spuData.supplyShopId,0)} okText="确认" cancelText="取消">
                <a> 不采纳 </a>
              </Popconfirm>
            </div>
          </Col>
        </Row>
      ,description:<SkuTable skuData={spuData.itemSupplyAuditSkuList} />
      }];
    return spuDataUnit;
  }
  
  render() {
    return(
      <div>
        <Table
          columns={true && this.createColumns()}
          expandedRowRender={record =>  <p>{record.description}</p>}
          dataSource={true && this.createSpuData()}
          pagination={false}
          onExpand={(record) => console.log(record.key)}
          size="middle"
          className="spu-warp"
        />
      </div>
    )
  }
}


