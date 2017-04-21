/**
 * Created by huangxiao3 on 2017/2/27.
 */
import React, {Component} from 'react';
import { Row, Col, Form, Input, Button, message } from 'jcloudui';
import SkuList from  '../SkuList/SkuList';
import styles from './style/SaleItemPriceList.less';
import RegionPriceEdit from  '../RegionPriceEdit/RegionPriceEdit';
import RegionPriceDetail from  '../RegionPriceDetail/RegionPriceDetail';
import  BaseComponent  from '../../Common/BaseComponent';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as action from './redux';
const FormItem = Form.Item;
@connect(
  state => ({SaleItemPriceList:state.saleItemPriceList}),
  dispatch => bindActionCreators({...action}, dispatch)
)
@Form.create()
export default class SaleItemPriceList extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    //保存子页面数据,
    this.regionList={};
  }

  //返回list中的全国价
  findTotalPrice(list,type){
    for(var key in list){
      if(list[key].areaId==0){
        if(type==='1' || type === 1){
          return list[key].marketPrice;
        }else{
          return list[key].costPrice;
        }
      }
    }
  }

  //保存子页面数据，通过uuid唯一标识，更新父页面的全国价格
  saveData(dataList){
    //获取 设置地域价 数据；根据uuid唯一表示并保存。
    this.regionList[dataList.uuid] = dataList;

    //更新父页面的input数据
    for(var key in this.regionList){
      var skuId = this.regionList[key].skuId;
      var type = this.regionList[key].priceType;
      var price = this.findTotalPrice(this.regionList[key].priceList,type);
      var totalPrice = this.regionList[key].totalPrice;
      if(totalPrice && totalPrice>0){
        if(type==='1' || type === 1){
          this.props.form.setFieldsValue({
            [`totalMarketPrice-${skuId}`]:totalPrice
          });
        }else{
          this.props.form.setFieldsValue({
            [`totalCostPrice-${skuId}`]:totalPrice
          });
        }
      }
    }
    console.log('SaleItemPriceList.js regionList is', this.regionList);
  }

  //组装数据并提交
  submitData(){
    debugger;
    //获取skuList信息，生成全量保存的数据结构，不包含全国价，全国价根据本页面的input进行再次保存
    var itemSkuInfoList = this.props.SaleItemPriceListData && this.props.SaleItemPriceListData.itemSkuInfoList

    var priceList=new Array();
    for(var item in itemSkuInfoList){
      if(itemSkuInfoList[item].shopItemSkuPriceList && itemSkuInfoList[item].shopItemSkuPriceList.length>0){
        var tmp={
          platformId:this.platformId,
          itemId: this.props.itemId,
          skuId: itemSkuInfoList[item].skuId,
          sellerId:this.props.sellerId,
          shopId:this.props.shopId,
          yn:0,
          marketPriceList:[],
          costPriceList:[],
          areaId:'0',
          marketPrice:null,
          costPrice:null,
        };
        for(var price in this.regionList){
          //遍历regionList，根据skuid和priceType进行匹配
          if(itemSkuInfoList[item].skuId==this.regionList[price].skuId && this.regionList[price].priceType=='1'){
            tmp.marketPriceList = tmp.marketPriceList.concat(this.regionList[price].priceList);
          }else if(itemSkuInfoList[item].skuId==this.regionList[price].skuId && this.regionList[price].priceType=='2'){
            tmp.costPriceList = tmp.costPriceList.concat(this.regionList[price].priceList);
          }
        }
        priceList.push(tmp);
      }
    }
    //获取本页面上的全国价
    let formValues = this.props.form.getFieldsValue();
    console.log("list page,all total price from Form is",formValues);
    for(var k in priceList){
      var skuId = priceList[k].skuId;
      var marketTotalPrice = formValues[`totalMarketPrice-${skuId}`];
      var costTotalPrice = formValues[`totalCostPrice-${skuId}`];

      //new interface
      if(marketTotalPrice!=null && marketTotalPrice!=undefined && marketTotalPrice!=''){
        priceList[k].marketPrice = marketTotalPrice;
        priceList[k].costPrice = costTotalPrice;
      }
    }

    console.log('final data', priceList);
    //临时修改，不保存任何数据，应传参数为priceList！！！！！！！！
    this.props.savePriceInfo(priceList).then(
      (result)=>{
        message.info('保存成功！');
        window.location.href = 'http://platform.hnc.jcloudec.com/operating-item-view/sale-item';
      }
    );
  }

  getUnifiedPrice (k){
    var marketPrice ='false';
    if(this.regionList && this.regionList[k]){
      for(var i=0;i<this.regionList[k].length;++i){
        if(this.regionList[k].areaId===0 && this.regionList[k].marketPrice!=''){
          marketPrice = this.regionList[k].marketPrice;
        }
      }
      if(marketPrice){
        return marketPrice;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  createData(){
    let uuid=0;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    var dataSource = this.props.SaleItemPriceListData && this.props.SaleItemPriceListData.itemSkuInfoList.map((data)=>{
      let diableFlag=true;
      if(data.shopItemSkuPriceList && data.shopItemSkuPriceList.length>0){
        diableFlag= false;
      }
      return(
        <tbody>
          {/*sku维度商品信息汇总*/}
          <tr className={styles.sumTr}>
            <td>{ data.attributesName }</td>
            <td>销量：{ data.salesVolume }</td>
            <td>平均供货价：<span className="txt-red">￥{ data.avgSupplyPrice }</span></td>
            <td>
              <FormItem inline required={true} label="全国统一面价：" {...formItemLayout} style={{margin:'0 0 0 0'}}>
                {getFieldDecorator(`totalMarketPrice-${data.skuId}`, {
                  initialValue: data.marketPrice,
                  rules: [{
                    required: true,
                    message: '请输入价格!',
                  },{
                    pattern:/^[0-9]*$/,
                    message:'请输入数字！'
                  }],
                })(
                  <Input size="large" maxLength="10" style={{ width: 90 }} disabled={diableFlag} />
                )}

              {!diableFlag &&
              <RegionPriceEdit
                priceType="1"
                itemId={this.props.itemId}
                skuId={data.skuId}
                savePrice={(dataList)=>this.saveData(dataList)}
                uuid={++uuid}
                queryPriceDetail={this.props.getPlatformPrice}
                totalPrice={this.props.form.getFieldValue(`totalMarketPrice-${data.skuId}`)}
              />
              }
              {!diableFlag &&
              <RegionPriceDetail
                priceType="1"
                itemId={this.props.itemId}
                skuId={data.skuId}
                sourceData={this.regionList[uuid]}
                totalPrice={this.props.form.getFieldValue(`totalMarketPrice-${data.skuId}`)}
              />
              }
              </FormItem>
            </td>
            <td>全国统一批发价：
                {getFieldDecorator(`totalCostPrice-${data.skuId}`, {
                  initialValue: data.costPrice,
                  rules: [{
                    required: true,
                    message: '请输入价格!',
                  },{
                    pattern:/^[0-9]*$/,
                    message:'请输入数字！'
                  }],
                })(
                  <Input size="large" style={{ width: 90 }} disabled={diableFlag} />
                )}
              {!diableFlag &&
              <RegionPriceEdit
                priceType="2"
                itemId={this.props.itemId}
                skuId={data.skuId}
                savePrice={(dataList)=>this.saveData(dataList)}
                uuid={++uuid}
                queryPriceDetail={this.props.getSuppluPrice}
                totalPrice={this.props.form.getFieldValue(`totalCostPrice-${data.skuId}`)}
              />
              }
              {!diableFlag &&<RegionPriceDetail
                priceType="2"
                itemId={this.props.itemId}
                skuId={data.skuId}
                sourceData={this.regionList[uuid]}
                totalPrice={this.props.form.getFieldValue(`totalCostPrice-${data.skuId}`)}
              />
              }
            </td>
          </tr>
          {/*某个sku对应的多个供应商*/}
          <SkuList shopItemSkuPriceList={data.shopItemSkuPriceList}/>
        </tbody>
      );
    });
    return dataSource;
  }

  render() {
    return (
      <Form>
        <div className="ui-tbl">
          <table>
            <colgroup>
              <col />
              <col />
              <col style={{width: 170}}/>
              <col style={{width: 350}} />
              <col style={{width: 350}} />
            </colgroup>
              {this.createData()}
          </table>
        </div>
        <div style = {{textAlign: 'center'}}>
          <Button style = {{marginLeft: '40px', marginTop: '40px'}} type="primary" onClick={()=>this.submitData()}>保存</Button>
          <Button style = {{marginLeft: '40px', marginTop: '40px'}}><a href='http://platform.hnc.jcloudec.com/operating-item-view/sale-item'>取消</a></Button>
        </div>
      </Form>
    )
  }

}