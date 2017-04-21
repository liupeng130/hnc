/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布-规格参数
 ****************************************************************/
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { Layout, Menu, Icon, Switch, Dropdown, Tabs, Breadcrumb, Form, Input, Select, Table, Checkbox } from 'jcloudui';
//import {Checkbox} from 'antd';
import CategoryCascade from '../Common/Category/CategoryCascade';
import {getGoodsInfo, uploadPrams, findCategory} from './redux'; 
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const styles = require('./style/GoodsBasic.less');
@Form.create()
@connect(
  state => ({
  	goodsRlease:state.goodsRlease,
  	goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({uploadPrams, findCategory}, dispatch)
)
export default class BasicInfomation extends Component{
	constructor(props, context) {
	  super(props, context);
	  this.saledata = [];
	  this.first = true;
	  this.state={
	  	saledata: [],
	  	divs: [],
	  };
	  this.itemPulishVO = [];
	  this.specData = []; //规格参数拿到的数据
	  this.firstLoad = true;
	  this.drops = null;
	  this.divs = [];
	  this.chks = [];
	  this.init = true;
	  this.checks = [];//当前选中的元素
	}
	handleSelectSize(value) {
	}
	handleSelectColor(value) {
	}
	handleSelectCapacity(value) {
	}
	handleSelectSpec(value) {
	}
	optionData(data){
		let optiondata = '';
		 data.map((item, index) => { 	
			optiondata += ('<Option><Checkbox>' + item.attrValueName + '</Checkbox></Option>');
		});
		return optiondata;
	}
	initData(data){
		let listdata;
		let divs;
		data.map((item, index) => {
			 listdata = this.optionData(item.platformCategoryAttributeValues);
			 item.platformCategoryAttributeValues.map((item,index) => {
			 	if(item.ifchecked == true){
			 		divs += '<span>'+item.attrValueName+'</span>';
			 		console.log(divs, 'divsdivsdivsdivsdivsdivs');
			 	}else{}
			 });
			 this.saleString += '<div><div class = '+styles.ov+'><label htmlFor="" class = '+styles.la+'>'+item.attrName+':</label><Select class = '+styles.sel+' placeholder="请选择" onChange = {this.handleSelectSize}>'+listdata+'</Select><Input class= '+styles.inp+' placeholder="输入属性描述" size="default" /></div><div class='+styles.dis+'>' + divs + '</div></div>';		 
		});
		this.setState({
			saleString: this.saleString
		});
		console.log(this.props.goodsRlease.saleInfoAfter,'this.props.goodsRlease.saleInfoAfter.lengththis.props.goodsRlease.saleInfoAfter.lengththis.props.goodsRlease.saleInfoAfter.length');
		console.log(divs,'divsdivsdivsdivsdivsdivs');
	}
	componentDidMount(){
		if(!this.props.editGoods){
			this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
		}else{}
	}
	changeAttr(e){
		this.specData.map((item,index) => { //重新渲染拿过来的数据 
			if(item.attrId == e.target.parentId){
				item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.attrValueId == e.target.id){
						item2.ifchecked = e.target.checked;
					}else{}
				});
			}
		});
		this.setState({
			saledata: this.specData
		});
		let checkedString = '';
		this.specData.map((item,index) => {
			item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.ifchecked === true){
						checkedString += (item2.attrId+':'+item2.attrValueId+':'+item.text+';');
					}else{}
				});
		});
		this.itemPulishVO.specAttributes = checkedString;
		this.props.uploadPrams(this.itemPulishVO);
		this.init = false;

	}
	delete(id, parentId){
		this.specData.map((item,index) => {
			if(item.attrId == parentId){
				item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.attrValueId == id){
						item2.ifchecked = false;					
					}else{}
				});
			}
		});
		this.checks.map((item, index) => {
			if(item[parentId] != undefined){
				item[parentId].map((item2, index2) => {
					if(item2 == id){
						this.checks[index][parentId].splice(index2, 1);
					}else{}
				});
			}else{}
		});
		this.setState({
			saledata: this.specData
		});
		let checkedString = '';
		this.specData.map((item,index) => {
			item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.ifchecked === true){
						checkedString += (item2.attrId+':'+item2.attrValueId+':'+item.text+';');
					}else{}
				});
		});
		this.itemPulishVO.specAttributes = checkedString;
		this.props.uploadPrams(this.itemPulishVO);
		this.init = false;
	}
	inputChange(attrId,e){
		this.specData.map((item, index) => {
			if(item.attrId == attrId){
				item.text = e.target.value;
			}else{}
		});
		let checkedString = '';
		this.specData.map((item,index) => {
			item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.ifchecked === true){
						checkedString += (item2.attrId+':'+item2.attrValueId+':'+item.text+';');
					}else{}
				});
		});
		this.itemPulishVO.specAttributes = checkedString;
		this.props.uploadPrams(this.itemPulishVO);
	}
    render() {
    	/*if(this.props.goodsRlease.saleloaded){
	    	//if(+this.props.goodsRlease.saleInfoAfter.length >= 1){
	    		//this.initData(this.props.goodsRlease.saleInfoAfter);	
	    	//}else{
	    	console.log(this.props.goodsRlease.saleData, 'afterafteraaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
	    		this.initData(this.props.goodsRlease.saleData);
	    	//} 	
    	}else{}*/
    	this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    	if(this.init){
    		this.saledata = this.props.goodsRlease.saleData; // 拿到的前面的销售属性的数据
    		this.specData = this.props.goodsRlease.categoryData.data; //规格参数的属性
    		if(this.saledata && this.saledata.length > 0){
				this.checks = [];
				this.saledata.map((item, index) => {
					this.checks.push({
						[item.attrId]: []
					});
					item.platformCategoryAttributeValues.map((item2, index2)=>{
						if(item2.ifchecked){ 
							this.checks[index][item.attrId].push(item2.attrValueId);
						}else{}	
					});
				});
			}else{}
    	}else{}
    	
    	if(this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.itemName && this.firstLoad){
		   		this.itemPulishVO = this.props.goodsEdit.editGoods;
		   		this.props.uploadPrams(this.itemPulishVO);
		   		this.firstLoad = false;
		}else{}
		//获取当前被选中的属性值 
		this.drops = [];
		if(this.specData && this.specData.length > 0 && this.saledata && this.saledata.length > 0){
			this.specData.map((item,index) => { //对拿到的规格参数数据遍历
				this.divs = []; //当前一共有多少DIV
				this.chks = []; //将初始值设置为空
				item.platformCategoryAttributeValues.map((item2,index2)=>{ //对属性值进行遍历
					let ifchecked = false;
					if(item2.ifchecked){
	    				this.divs.push(<span id = {item2.attrValueId} parentId = {item2.attrId} className = {styles.span}>{item2.attrValueName}<Icon id = {item2.attrValueId} parentId = {item2.attrId} type="close" onClick = {() => {this.delete(item2.attrValueId, item2.attrId)}}/></span>);
	    				ifchecked = true;
	    			}else if(true){
	    				this.checks.map((saleitem, index4)=>{ //对前面选中的销售表格进行遍历	
							let keys = [];
							for(var key in saleitem){
						    		keys.push(key);
								 }
							saleitem[keys[0]].map((ssitem, index3) => { //遍历里面每个被选中的原素
								   if(item2.attrValueId == ssitem && item.attrId == keys[0]){ 
					    				this.divs.push(<span id = {item2.attrValueId} parentId = {item2.attrId} className = {styles.span}>{item2.attrValueName}<Icon id = {item2.attrValueId} parentId = {item2.attrId} type="close" onClick = {() => {this.delete(item2.attrValueId, item2.attrId)}}/></span>);
					    				ifchecked = true;
					    				(this.specData[index].platformCategoryAttributeValues)[index2].ifchecked = true;
					    				return;
					    			}else {

					    			}
							});	

						});
	    			}else{}	
					this.chks.push(<Menu.Item><div><Checkbox id = {item2.attrValueId} parentId = {item2.attrId} checked = {ifchecked || item2.ifchecked} onChange={::this.changeAttr} />{item2.attrValueName}</div></Menu.Item>);
		    	});
	    		const menu = (
			      <Menu>
			        {this.chks}
			      </Menu>
			    );
		        this.drops.push(<div><div className = {styles.ov}><label htmlFor="" className = {styles.la}>{item.attrName}:</label><Dropdown.Button overlay={menu} className = {styles.sel}><a className="ant-dropdown-link" href="#">请选择</a></Dropdown.Button><Input className= {styles.inp} onBlur = {(e)=>{this.inputChange(item.attrId,e);}} placeholder="输入属性描述" size="default" /></div><div className={styles.dis}>{this.divs}</div></div>);
		    });
	    }else{}
	    this.props.goodsRlease.saleData && (this.init = true);	
	    return (
		    	<div id = 'spec'>
		    		{this.drops}
		    	</div>
	    )
    }
}