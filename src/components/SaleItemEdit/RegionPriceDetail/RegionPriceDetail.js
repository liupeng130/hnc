/**
 * Created by huangxiao3 on 2017/2/28.
 */

import React, {Component, PropTypes} from 'react';
import { Modal, Button, Form, Input, Icon, Row, Col,Popover, Checkbox } from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  BaseComponent  from '../../Common/BaseComponent';
import {queryInitialData} from './redux';
import styles from './style/RegionPriceDetailTable.less';



@connect(
  state => ({RegionPriceDetail:state.regionPriceDetail}),
  dispatch => bindActionCreators({queryInitialData}, dispatch)
)
export default class RegionPriceDetail extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
    this.sourceData=[];
  }

  /*  componentWillMount() {
   this.props.queryAddress();
   }*/

  //设置地域价窗口:展示
  showModal(){
    debugger;
    if(this.props.sourceData){
      this.sourceData = this.regionDataTransform();
      this.setState({
        visible: true,
      });
    }else{
      this.props.queryInitialData({
        itemId:this.props.itemId,
        skuId:this.props.skuId,
        priceType:this.props.priceType,
        platformId:this.platformId
      }).then(
        (result)=>{
          this.sourceData = this.ajaxDataTransform();
          this.setState({
            visible: true,
          });
        }
      );
    }

  }

  regionDataTransform(){
    debugger;
/*    {
      uuid :123, skuId:1, priceType:1,
      priceList:
      [
        {areaId:1,areaName:'北京',marketPrice:100},
        {areaId:1,areaName:'上海',marketPrice:100},
      ]
    }*/
    let priceList = this.props.sourceData && this.props.sourceData.priceList;
    var result = [];
    var price = '';
    var areaStr = '';
    if(priceList && priceList.length>0){
      if(this.props.priceType===1 || this.props.priceType==='1' ){
        price =priceList[0].marketPrice;
        for(var k in priceList){
          if(price===priceList[k].marketPrice){
            price = priceList[k].marketPrice;
            areaStr = areaStr+priceList[k].areaName+'    ';
          }else{
            result.push({price:price,areaStr:areaStr});
            price = priceList[k].marketPrice;
            areaStr = priceList[k].areaName+'    ';
          }
        }
        result.push({price:price,areaStr:areaStr});
      }else{
        price =priceList[0].costPrice;
        for(var k in priceList){
          if(price===priceList[k].costPrice){
            price = priceList[k].costPrice;
            areaStr = areaStr+priceList[k].areaName;
          }else{
            result.push({price:price,areaStr:areaStr});
            price = priceList[k].costPrice;
            areaStr = areaStr+priceList[k].areaName;
          }
        }
        result.push({price:price,areaStr:areaStr});
      }
    }
    return result;
  }

  ajaxDataTransform(){
    var sourceData = this.props.RegionPriceDetail && this.props.RegionPriceDetail.data;
    var result =[];
    var price = '';
    var areaStr = '';
    if(this.props.priceType===1 || this.props.priceType==='1' ){
      for(var k in sourceData){
        price = sourceData[k].marketPrice;
        for(var j in sourceData[k].tradeItemSkuPriceList){
          areaStr = areaStr+sourceData[k].tradeItemSkuPriceList[j].areaName+' ';
        }
        result.push({price:price,areaStr:areaStr});
        price = '';
        areaStr = '';
      }
    }else{
      for(var k in sourceData){
        price = sourceData[k].costPrice;
        for(var j in sourceData[k].tradeItemSkuPriceList){
          areaStr = areaStr+sourceData[k].tradeItemSkuPriceList[j].areaName+' ';
        }
        result.push({price:price,areaStr:areaStr});
        price = '';
        areaStr = '';
      }
    }
    return result;
  }

  createAreaPriceDom(){
    var sourceData = this.sourceData;
    var result = sourceData.map((k)=>{
      return (
        <tr>
          <td className={styles.t65}>
            ￥{k.price}
          </td>
          <td className={styles.t250}>
            {k.areaStr}
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
    let showAreaPrice = false;
    if(this.sourceData && this.sourceData.length>0){
      showAreaPrice = true;
    }
    return (
      <a className="ml10" onClick={()=>this.showModal()}>查看
        <Modal
          title={'查看地域价'}
          visible={this.state.visible}
          onOk={()=>this.handleCancel()}
          width={'359'}
          onCancel={()=>this.handleCancel()}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={()=>this.handleCancel()}>确 定</Button>
          ]}
          maskClosable={false}
        >
          <div className={styles.testh3}>
            <h3>全国统一价：￥{this.props.totalPrice}</h3>
          </div>
          <div>
            <h3 className={styles.testh3}>地域价</h3>
            {showAreaPrice &&
              <table className={styles.test}>
                <colgroup>
                  <col style={{width: 65}} />
                  <col style={{width: 250}} />
                </colgroup>
                <tbody>
                {this.createAreaPriceDom()}
                </tbody>
              </table>
            }
          </div>
        </Modal>
      </a>
    );
  }
}