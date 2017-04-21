/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布-规格参数
 ****************************************************************/
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { Layout, Menu, Icon, Switch, Dropdown, Tabs, Breadcrumb, Form, Input, Select, Table, Radio ,Upload, Button, InputNumber} from 'jcloudui';
import {Checkbox} from 'antd';
import CategoryCascade from '../Common/Category/CategoryCascade';
import {uploadPrams} from './redux';
import FileUp from './FileUp/FileUp';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const styles = require('./style/GoodsBasic.less');
@connect(
  state => ({
  	goodsRlease: state.goodsRlease,
  	goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({uploadPrams}, dispatch)
)
export default class BasicInfomation extends Component{
	constructor(props, context) {
	  super(props, context);
	  this.state = {
	  	value: 1,
	  	deliveryType: 1,
	  	saleType: 1,
	  	refundService: 1,
	  	changeService: 1,
	  };
	  this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
	  this.first = false;
	  this.firstLoad = true;
	}
	onChange(e) {
	    console.log('radio checked', e.target.value);
	    this.setState({
	      value: e.target.value,
	    });

	 }
	onChangecarriage(e) {
	    console.log('radio checked', e.target.value);
	 }
	onChangeCount(e) {
	    console.log('radio checked', e.target.value);
	 }
	handleChange(e){

	}
	onChangehomeDelivery(e){
		if(e.target.checked == true){
			this.itemPulishVO.itemDeliveryInfoVo.homeDelivery = 1;
		}else{
			this.itemPulishVO.itemDeliveryInfoVo.homeDelivery = 0;
		}
		this.props.uploadPrams(this.itemPulishVO);
	}
	onChangedeliveryType(e){
		console.log(e.target.value, 'onChangedeliveryType');
		this.itemPulishVO.itemDeliveryInfoVo.deliveryType = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
		 this.setState({
	      deliveryType: e.target.value,
	    });
	}
	onChangesaleType(e){
		console.log(e.target.value, 'onChangeinitialMount');
		this.itemPulishVO.itemSaleInfoVo.saleType = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
		this.setState({
	      saleType: e.target.value,
	    });
	}
	onChangeinitialMount(e){
		console.log(e, 'onChangeinitialMount');
		this.itemPulishVO.itemSaleInfoVo.initialMount = e;
		this.props.uploadPrams(this.itemPulishVO);
	}
	onChangedeliveryCycle(e){
		console.log(e, 'onChangedeliveryCycle');
		this.itemPulishVO.itemSaleInfoVo.deliveryCycle = e;
		this.props.uploadPrams(this.itemPulishVO);
	}
	onChangerefundService(e){
		console.log(e.target.value, 'onChangerefundService');
		this.itemPulishVO.itemAfterSaleVo.refundService = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
		this.setState({
	      refundService: e.target.value,
	    });
	}
	onChangerefundDuration(e){// 退货时长
		console.log(e, 'onChangerefundDuration');
		this.itemPulishVO.itemAfterSaleVo.refundDuration = e;
		this.props.uploadPrams(this.itemPulishVO);
	}
	onChangechangeService(e){
		console.log(e.target.value, 'onChangechangeService');
		this.itemPulishVO.itemAfterSaleVo.changeService = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
		this.setState({
	      changeService: e.target.value,
	    });
	}
	onChangechangeDuration(e){
		console.log(e, 'onChangechangeDuration');
		this.itemPulishVO.itemAfterSaleVo.changeDuration = e;
		this.props.uploadPrams(this.itemPulishVO);
	}
	onChangerepaireDuration(e){
		console.log(e, 'onChangerepaireDuration');
		this.itemPulishVO.itemAfterSaleVo.repaireDuration = e;
		this.props.uploadPrams(this.itemPulishVO);
	}
	changeArear(e){
		console.log(e.target.value, 'changeArear');
		this.itemPulishVO.packingList = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
	}
	componentWillMount(){
		if(!this.props.editGoods){
			this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
		}else{}
	}
    render() { 	
		this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
	 	let editData ;
	  if(this.props.goodsEdit &&  this.props.goodsEdit.editGoods!== undefined && this.props.goodsEdit.editGoods.length > 0){
	  	this.first = true;
	  	editData = this.props.goodsEdit.editGoods;
	  }else{}
	   if(this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.itemName && this.firstLoad){
	   		this.itemPulishVO = this.props.goodsEdit.editGoods;
	   		this.props.uploadPrams(this.itemPulishVO);
	   		this.firstLoad = false;
	   }else{}
      return (
      	<div className="ui-container">
      		<div className="ui-ct">
	      		<strong className = {styles.strongstyle}>运费信息</strong>
		      		<RadioGroup onChange={::this.onChangedeliveryType} defaultValue = {this.props.editGoods && this.props.goodsEdit.editGoods.itemDeliveryInfoVo.deliveryType} value={this.state.deliveryType}>
				        <Radio style = {{marginLeft: '14px', marginTop: '20px'}} value={1}>商品价格已包含运费（选择此项时请记得将运费分摊至商品单价里</Radio><br/>
				        <Radio style = {{marginLeft: '14px', marginTop: '20px'}} value={2}>选择合适的物流公司运输，运费到付（不需要在产品单价里加运费，买家根据实际费用支付）</Radio><br/>
				    </RadioGroup>
				    <br/>
			     <Checkbox defaultValue = {this.props.editGoods? (this.props.goodsEdit.editGoods.itemDeliveryInfoVo.homeDelivery == 1) : false} style = {{marginLeft: '14px', marginTop: '20px'}} onChange={::this.onChangehomeDelivery}>同城可送货上门</Checkbox>
	      		<strong className = {styles.strongstyle}>销售方式</strong>
	      			<label htmlFor="" className = {styles.la} style = {{marginLeft: '14px'}}>最小起订量:</label>
	      			<RadioGroup defautValue = {1} onChange={::this.onChangesaleType} value={this.state.saleType}>
				        <Radio value={1}>按单品</Radio>
				        {/*<Radio value={2}>按总量</Radio>*/}
				    </RadioGroup>
				    <span>订购大于等于 <InputNumber min={1} defaultValue={this.props.editGoods ? this.props.goodsEdit.editGoods.itemSaleInfoVo.initialMount : 1} onChange={::this.onChangeinitialMount} /> （计量单位）方可订购</span>
				    <br/>
				    <label htmlFor="" className = {styles.la} style = {{marginLeft: '14px', marginTop: '20px'}}>交货周期:</label>  
	 				<Select defaultValue={this.props.editGoods ? this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle : '4'} style = {{marginTop: '20px',  width: '50px'}} onChange={::this.onChangedeliveryCycle}>
				      <Option value="4">4</Option>
				      <Option value="7">7</Option>
				      <Option value="15">15</Option>
				    </Select>
				    <span style = {{marginTop: '20px'}}>天</span>
	      		<strong className = {styles.strongstyle}>售后说明</strong>
	      			<label htmlFor="" className = {styles.la}>退货:</label>  
	      			<RadioGroup defaultValue={this.props.editGoods ? this.props.goodsEdit.editGoods.itemAfterSaleVo.refundService : 2} onChange={::this.onChangerefundService} value={this.state.refundService} style = {{marginLeft: '14px', marginTop: '20px'}}>
				        <Radio value={1}>特殊商品，一经签收非质量问题不予退货</Radio><br/>
				        <Radio value={2}>确认收货后 <InputNumber style = {{marginTop: '20px'}} min={0} max={10} defaultValue={this.props.editGoods ? this.props.goodsEdit.editGoods.itemAfterSaleVo.refundDuration: '7'} onChange={::this.onChangerefundDuration} /> 日内可与卖家协商退货，可能需要扣除部分货款作为卖家的损失</Radio><br/>
				    </RadioGroup>
				    <br/>
				    <label htmlFor="" className = {styles.la}>换货:</label>
				    <RadioGroup defaultValue={this.first && editData.itemAfterSaleVo.changeService} onChange={::this.onChangechangeService} value={this.state.changeService} style = {{marginLeft: '14px', marginTop: '20px'}}>
				        <Radio value={1} >特殊商品，一经签收非质量问题不予换货</Radio><br/>
				        <Radio value={2} >确认收货后 <InputNumber style = {{marginTop: '20px'}} min={0} max={10} defaultValue={this.props.editGoods ? this.props.goodsEdit.editGoods.itemAfterSaleVo.changeDuration : '7'} onChange={::this.onChangechangeDuration} /> 日内可与卖家协商换货，换货过程中可能会产生一些额外费用</Radio><br/>
				    </RadioGroup>
				    <br/>
				    <label htmlFor="" className = {styles.la}>质保:</label>
				    <p style = {{marginLeft: '18px', marginTop: '20px'}}>质保期限 <InputNumber defaultValue={this.props.editGoods ? this.props.goodsEdit.editGoods.itemAfterSaleVo.repaireDuration : '3'} min={0} max={10}  onChange={::this.onChangerepaireDuration} /> 个月</p><br/>
				    <p style = {{marginLeft: '60px', marginTop: '20px'}}>如有任何售后问题请尽量在质保期内联系卖家协商处理，超过质保期卖家不保证受理，请知悉！</p><br/>
	  		    <strong className = {styles.strongstyle}>其它信息</strong>
	      			<label htmlFor="" className = {styles.la}>包装清单:</label>
	      				<textarea style = {{marginBottom: '30px'}} defaultValue={this.props.editGoods ? this.props.goodsEdit.editGoods.packingList : ''} name="message" rows="10" cols="50" onChange={::this.changeArear}></textarea>
	      				<br/>
	      			<label htmlFor="" className = {styles.la} >商品手册:</label>
		      			{/*<Upload {...props} style = {{marginTop: '20px', width: '100px'}}>
						    <Button style = {{marginTop: '20px'}}>
						    	<Icon type="plus" /> 添加手册
						    </Button>
						</Upload>*/}
						<FileUp></FileUp>	
			</div>			
      	</div>
      )
    }
}