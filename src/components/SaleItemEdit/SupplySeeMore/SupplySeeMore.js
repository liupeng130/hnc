/**
 * Created by huangxiao3 on 2017/3/16.
 */

import React, {Component, PropTypes} from 'react';
import { Modal, Button, Form, Input, Icon, Row, Col,Popover, Checkbox } from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  BaseComponent  from '../../Common/BaseComponent';
import {queryAreaSupplyPrice} from './redux';
import style from './style/SupplySeeMore.less';

@connect(
  state => ({SupplySeeMore:state.supplySeeMore}),
  dispatch => bindActionCreators({queryAreaSupplyPrice}, dispatch)
)
export default class SupplySeeMore extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
    this.sourceData=[];
  }

  //设置地域价窗口:展示
  showModal(){
    this.props.queryAreaSupplyPrice({
      itemId:this.props.itemId,//66
      skuId:this.props.skuId,//1005803
      platformId:this.platformId,
      supplySellerId:this.props.supplySellerId,//112
    }).then(
      (result)=>{
        this.setState({
          visible: true,
        });
      }
    );
  }

  //生成 "销售范围" 数据
  createAreaData(){
    /*//测试数据
    var sourceData =
    [
      {
        "id": null,
        "platformId": null,
        "itemId": null,
        "skuId": null,
        "supplySellerId": null,
        "supplyShopId": null,
        "supplyPrice": 98,
        "areaName": "河南，山西，上海",
        "areaId": null,
        "areaNumber": null,
        "supplyStatus": null,
        "created": null,
        "modified": null,
        "yn": null
      },
      {
        "id": null,
        "platformId": null,
        "itemId": null,
        "skuId": null,
        "supplySellerId": null,
        "supplyShopId": null,
        "supplyPrice": 100,
        "areaName": "北京，广州，厦门",
        "areaId": null,
        "areaNumber": null,
        "supplyStatus": null,
        "created": null,
        "modified": null,
        "yn": null
      }
    ];*/
    var sourceData = this.props.SupplySeeMore && this.props.SupplySeeMore.data;
    var result='';
    for(var k in sourceData){
      result = result+sourceData[k].areaName+'，';
    }
    debugger;
    /*result = result.replace(/\,/g," ");*/
    return (
      <div style={{marginTop:'10px',marginBottom:'10px'}}>
        {result}
      </div>
    );
  }

  //生成 "区域价" 数据
  createAreaPriceDom(){
    debugger;
/*  //测试数据
    var sourceData =
      [
        {
          "id": null,
          "platformId": null,
          "itemId": null,
          "skuId": null,
          "supplySellerId": null,
          "supplyShopId": null,
          "supplyPrice": 98,
          "areaName": "河南，山西，上海",
          "areaId": null,
          "areaNumber": null,
          "supplyStatus": null,
          "created": null,
          "modified": null,
          "yn": null
        },
        {
          "id": null,
          "platformId": null,
          "itemId": null,
          "skuId": null,
          "supplySellerId": null,
          "supplyShopId": null,
          "supplyPrice": 100,
          "areaName": "北京，广州，厦门",
          "areaId": null,
          "areaNumber": null,
          "supplyStatus": null,
          "created": null,
          "modified": null,
          "yn": null
        }
      ];*/
    var sourceData = this.props.SupplySeeMore && this.props.SupplySeeMore.data;
    var result = sourceData && sourceData.map((k)=>{
        debugger;
      var areaName = k.areaName.replace(/\,/g," ")
      return (
        <tr>
          <td className={style.t96}>
            ￥{k.supplyPrice}
          </td>
          <td className={style.t120}>
            {areaName}
          </td>
        </tr>
      );
    });
    return result;
  }


  //设置地域价窗口：关闭
  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <a className="fr mr10" onClick={()=>this.showModal()}>查看更多
        <Modal
          title={'销售范围及地域价'}
          visible={this.state.visible}
          onOk={()=>this.handleCancel()}
          width={'360'}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={()=>this.handleCancel()}>确 定</Button>
          ]}
          maskClosable={false}
        >
          <div>
            <h3 style={{marginBottom:'10px'}}>销售区域</h3>
            <div className={style.test}>
              {this.createAreaData()}
            </div>
          </div>
          <div className="regionBox">
            <h3 className={style.testh3}>地域价</h3>
            <div>
              <table className={style.test}>
                <colgroup>
                  <col style={{width: 50}} />
                  <col style={{width: 250}} />
                </colgroup>
                <tbody>
                {this.createAreaPriceDom()}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </a>
    );
  }
}