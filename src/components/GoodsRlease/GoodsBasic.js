/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布-基本信息
 ****************************************************************/
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { Provider } from 'react-redux'
import {bindActionCreators} from 'redux';
//import { createStore } from 'redux'
import { asyncConnect } from 'redux-async-connect';
import { Layout, Menu, Icon, Switch, Dropdown, Tabs, Breadcrumb, Form, Input, Select, Table, Modal, Button } from 'jcloudui';
import {Checkbox} from 'antd';
import CategoryCascade from './Category/CategoryCascade';
//import CategoryCascade from '../Common/Category/CategoryCascade';
import BrandSelect from '../Common/BrandSelect/BrandSelect';
import {getGoodsInfo} from './redux';
import {brandSearch, brandSearchByCid} from '../Common/BrandSelect/redux'; //品牌
import {getSaleInfo, getBrandInfo, postSaleInfo, uploadPrams, getUnitInfo, findCategory, uploadSaleMessage} from './redux';
import reducer from 'components/GoodsRlease/Category/reducer';
//进行组件隔离
import ApiClient from '../../helpers/ApiClient';
import createStore from '../../redux/create';
import { Router, browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const styles = require('./style/GoodsBasic.less');

@connect(
  state => ({
  	goodsRlease:state.goodsRlease,
  	brandSelect:state.brandSelect,
  	goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({getGoodsInfo, brandSearch, getSaleInfo, getBrandInfo, postSaleInfo, uploadPrams, getUnitInfo, findCategory, uploadSaleMessage, brandSearchByCid}, dispatch)
)
@Form.create()
export default class GoodsBasic extends Component {
	constructor(props, context) {
	  super(props, context);
	  //this.store = createStore(reducer);
	  this.initSaleData = [];//初始销售规格信息
	  this.initBrandData = [];//初始类目属性信息
	  this.checkedCount = {}; // 一共选择了多少行
	  this.state={
	  	checkedList: ['红色', '黑色'],
	  	initFirst: true, // 是否第一次渲染
	  	ifAddBrand: false,
	  	error: false,
	  	errorMSG: '',
	  	saleData: [], //销售规格表格
	  	brandData: [], //类目属性表格
	  	saleMessageData:[], //销售信息表格
	  	currentIndex: 0,
	  	index: 0,
	  	ifhavedata: false,
	  	ifhavedata2: false,
	  	ifBrandName: false,
	  	selectCid: ''
	  };
	  this.name = '';
	  this.cid = ''; //第一平台分类
	  this.secondCid = ''; //第二平台分类
	  this.handleOk = true;
	  this.plainOptions = ['红色', '黑色', '白色'];
	  this.saleColumns = [{
		  title: '属性名称',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '属性值',
		  dataIndex: 'value',
		  key: 'value',
		}];
	  this.saleData = [];
	  this.saleMessage = [{
	  	title: '商品信息',
	  	dataIndex: 'message',
	  	key: 'message'
	  }, {
	  	title: '型号',
	  	key: 'model',
	  	render: (text, record) => (
	  		<input defaultValue = {record.Model} type="text" disabled = {record.ifstop} onBlur = {(e) => {this.changeModel(text, record, e);}}/>
	  		),
	  }, {
	  	title: '商品货号',
	  	key: 'productNumber',
	  	render: (text, record) => (
	  		<input defaultValue = {record.Number} type="text" disabled = {record.ifstop} onBlur = {(e) => {this.changeNumber(text, record, e);}}/>
	  		),
	  }, {
	  	title: '商品条码',
	  	key: 'productCode',
	  	render: (text, record) => (
	  		<input defaultValue = {record.Code} type="text" disabled = {record.ifstop} onBlur = {(e) => {this.changeCode(text, record, e);}}/>
	  		),
	  }, {
	  	title: '商品重量',
	  	key: 'productWeight',
	  	render: (text, record) => (
	  		<input defaultValue = {record.Weight}  type="text" disabled = {record.ifstop} onBlur = {(e) => {this.changeWeight(text, record, e);}}/>
	  		),
	  }, {
	  	title: '',
	  	key: 'unit',
	  	render: (text, record) => (
	  		 <Select className = {styles.inputname} style = {{width: '50px'}} disabled = {record.ifstop} defaultValue = {record.Number? record.Number : 'g'} placeholder="请选择计量单位" onChange={(e) => {this.changeUnit(text, record, e);}}>
			    <Option value="g">g</Option>
              	<Option value="kg">kg</Option>
			 </Select>
			)
	  	}, {
	  	title: '操作',
	  	key: 'newaction',
	  	render: (text, record) => (
	  		record.ifstop ?
	  		<span style = {{cursor: 'pointer'}} onClick = {() => {this.changeStatus(text,record);}}>启动</span>
	  		: <span style = {{cursor: 'pointer'}} onClick = {() => {this.changeStatus(text,record);}}>停用</span>
	  		),
	  	}
	  ];
	  this.saleMessageData = [];
	  this.addbrand = [];
	  this.firstCid = '';
	  this.secondCid = '';
	  this.detailData = [];//处理过的数据
	  this.brandData = [];
	  this.init = true;
	  this.itemPulishVO = [];
	  this.currentIndex = 0;
	  this.record = {};
	  this.checkedList = [];
	  this.checkedList2 = [];
	  this.ifhavedata = false;
	  this.initd = true;
	  this.edit = {};
	  this.errorMSG = '';
	  this.step1 = false;
	  this.step2 = false;
	  this.step3 = false;
	  this.step4 = false;
	  this.selectCid = '';//平台分类的cid
	  this.name = false; //判断错误名称是否为空
	  this.ifBrandName = false; //判断品牌其它名称是否为空
	  this.firstLoad = true;
	  //组件隔离
	  const client = new ApiClient();
	  const _browserHistory = useScroll(() => browserHistory)();
	  this.store1 = createStore(_browserHistory, client, {},reducer);
	  this.store2 = createStore(_browserHistory, client, {},reducer);
	}
	changeGoodsName(e){
		this.itemPulishVO.itemName = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
		let value = this.Trim(e.target.value, 'g');
		if(value == ''){
			//alert('输入名称不能为空');
			this.name = true;
		}else{
			this.name = false;
		}
	}
	Trim(str,is_global)    //去除字符串空格
        {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g")
            {
                result = result.replace(/\s/g,"");
             }
            return result;
		}
	changeStatus(text,record){
		let saleMessageData = [...this.state.saleMessageData];
		if(record.ifstop == false) {
			//saleMessageData[record.key].action = <span style = {{cursor: 'pointer'}} onClick = {() => {this.changeStatus1(text,record);}}>停用</span>;
			saleMessageData[record.key].ifstop = true;
			this.itemPulishVO.itemSkuVoList[record.key].skuStatus = 0;
			this.props.uploadPrams(this.itemPulishVO);
		}else{
			//saleMessageData[record.key].action = <span style = {{cursor: 'pointer'}} onClick = {() => {this.changeStatus1(text,record);}}>启用</span>;
			saleMessageData[record.key].ifstop = false;
			this.itemPulishVO.itemSkuVoList[record.key].skuStatus = 1;
			this.props.uploadPrams(this.itemPulishVO);
		}
		this.setState({
			saleMessageData
		});
	}
	changeModel(text, record, e){// 改变型号
		this.itemPulishVO.itemSkuVoList[record.key].modelCode = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
	}
	changeNumber(text, record, e){// 改变商品货号
		this.itemPulishVO.itemSkuVoList[record.key].productCode = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
	} 
	changeCode(text, record, e){// 改变商品条码
		this.itemPulishVO.itemSkuVoList[record.key].barCode = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
	}
	changeWeight(text, record, e){// 改变商品重量
		this.itemPulishVO.itemSkuVoList[record.key].weight = e.target.value ;
		this.props.uploadPrams(this.itemPulishVO);
	}
	changeUnit(text, record, e){ //改变商品单位
		//this.itemPulishVO.itemSkuVoList[record.key].weight = e;
		this.itemPulishVO.itemSkuVoList[record.key].unit = e ;
		/*let unit = this.itemPulishVO.itemSkuVoList[record.key].weight;
		if (unit.indexOf('kg') == -1 ){
			unit = unit.slice(0,unit.length - 2);
			unit = unit + e;
		}else{
			unit = unit.slice(0,unit.length - 3);
			unit = unit + e;
		}*/
		//this.itemPulishVO.itemSkuVoList[record.key].weight = unit;
		this.props.uploadPrams(this.itemPulishVO);
	}
	handleCategoryChange(value) { // 更改平台分类 
		this.selectCid = value;
		this.firstCid = value;
		if((this.firstCid == this.secondCid) && (this.firstCid != '') && (this.secondCid != '')){
			this.setState({
				error: true,
				errorMSG: '平台分类与第二分类选择不能相同'
			});
		}else{
			this.itemPulishVO.cid = value;
			this.props.uploadPrams(this.itemPulishVO);
			this.setState({
				error: false
			});
		}//平台分类
		let param = {
	      platformId: 2,
	      cid: value
	    };
		this.props.getSaleInfo(param);
	    this.props.getBrandInfo(param);
	    this.props.getUnitInfo(param);
	    this.props.findCategory(param);
	    this.props.brandSearchByCid({
          platformId: this.platformId,
          categoryId: this.selectCid,
        });
	    this.init = true;
	    this.setState({
	    	saleMessageData: [],
	    	selectCid: value
	    });
	}
	handleSecondCategoryChange(value) {
		this.secondCid = value;
		if((this.firstCid == this.secondCid) && (this.firstCid != '') && (this.secondCid != '')){
			this.setState({
				error: true,
				errorMSG: '平台分类与第二分类选择不能相同'
			});
			this.errorMSG = '平台分类与第二分类选择不能相同';
			this.info();
		}else{
			this.itemPulishVO.secondCid = value;
			this.props.uploadPrams(this.itemPulishVO);
			this.setState({
				error: false
			});

		}//第二分类
		/*let param = {
	      platformId: 2,
	      cid: value
	    };
		this.props.getSaleInfo(param);
	    this.props.getBrandInfo(param);
	    this.props.getUnitInfo(param);
	    this.props.findCategory(param);*/ // 更改第二分类
	}
	handleBrandSelectChange(value){
		this.itemPulishVO.brandId = value;
		if(value == -1){
			this.itemPulishVO.brandName = '';
		}else{}
		this.props.uploadPrams(this.itemPulishVO);
		if(value == -1){
			this.setState({
				ifAddBrand: true
			});
		}else{
			this.setState({
				ifAddBrand: false
			});
		}
	}
	handleSelectmeasuring(value) { //改变计量单位
	    this.itemPulishVO.unit = value;
		this.props.uploadPrams(this.itemPulishVO);
	}
	changePlace(e){//地名
		this.itemPulishVO.origin = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
	}
	changePromulgator(value){}
	changeOperators(value){
		this.itemPulishVO.operatorId = value;
		this.props.uploadPrams(this.itemPulishVO);
	}
	componentWillMount(){ 
		if(!this.props.editGoods){
			this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
		}else{}
	}
	addBrand(e){ //新添加的品牌
		if(e.target.value == '' || e.target.value == null){
			this.setState({
				ifBrandName: true
			});
		}else{
			this.setState({
				ifBrandName: false
			});
		}
		this.itemPulishVO.brandName = e.target.value;
		this.props.uploadPrams(this.itemPulishVO);
	}
	setModal2Visible(error) {
	    this.setState({ error });
	}
	onChange(e,val) {
		//判断他选了多少行start
		let sameAttr = false;
		let findId;
		let saleifchecked;
		if(val){
			findId = val;
		}else{
			findId = e.target.attrId;
		}
		let count = 0;
		this.checkedCount = [];
		let ifHas = false;
		// 判断一共有多少组数据被点中start
		this.initSaleData.map((item,index) => {
			this.checkedCount[index] = [];
			item.platformCategoryAttributeValues.map((item2, index2) => {
				if(item2.ifchecked == true){
					//item.platformCategoryAttributeValues[index2].parentId = item.attrId;
					this.checkedCount[index].push(item.platformCategoryAttributeValues[index2]);
				}else{}
			});
		});
		// 判断一共有多少组数据被点中end
		//判断当前选中元素位置
		this.initSaleData.map((item2,index2) => {
         	item2.platformCategoryAttributeValues.map((item3, index3) => {
         		if(item3.attrValueId == findId){
         			if(this.checkedCount[index2].length >= 1){
         				ifHas = true;
         			}else{
         				ifHas = false;
         			}
         		}else{}

         	});
         });
		//end
		if(this.checkedCount.length > 0){
			this.checkedCount.map((item, index) => {
				if(+item.length >= 1){
			        //判断当前选中元素位置
					count += 1;
				}else{}
			});
			if(count >= 3 && !ifHas && !this.init){
				this.setState({
					error: true,
					errorMSG: '只能选择三种属性信息'
				});
				this.errorMSG = '只能选择三种属性信息';
				this.info();
				return false; 
			}
		}
		//判断他选了多少行end
	   this.initSaleData.map((item, index1) => {
	   	item.platformCategoryAttributeValues.map((item, index2) => {
	   		if(item.attrValueId == findId){
	   			sameAttr = true;
	   			saleifchecked = !this.saleData[index1].value[index2].props.checked;
	   			this.saleData[index1].value[index2] =  (<Checkbox attrId = {item.attrValueId} checked = {saleifchecked} onChange={::this.onChange}> {item.attrValueName} </Checkbox>);
	   			this.initSaleData[index1].platformCategoryAttributeValues[index2].ifchecked = saleifchecked;
	   		}else{}
	   	});
	   });
	   this.initBrandData.map((item2, index1) => {
	   	item2.platformCategoryAttributeValues.map((item, index2) => {
	   		if(item.attrValueId == findId){
	   			let ifchecked
	   			if(sameAttr == true){
	   				ifchecked = saleifchecked;
	   			}else{
	   				ifchecked = !this.brandData[index1].value[index2].props.checked;
	   			}
	   			
	   			this.brandData[index1].value[index2] =  (<Checkbox attrId = {item.attrValueId} parentId = {item2.attrId} checked = {ifchecked} onChange={::this.onChangeBrand}> {item.attrValueName} </Checkbox>);
	   			this.initBrandData[index1].platformCategoryAttributeValues[index2].ifchecked = 	ifchecked;
	   		}else{}
	   	});
	   });
	   //再重新获取一下新数组
	   this.initSaleData.map((item,index) => {
			this.checkedCount[index] = [];
			item.platformCategoryAttributeValues.map((item2, index2) => {
				if(item2.ifchecked == true){
					//item.platformCategoryAttributeValues[index2].parentId = item.attrId;
					this.checkedCount[index].push(item.platformCategoryAttributeValues[index2]);
				}else{}
			});
		});
	   //销售信息表格
	   let saleMSG = [];
	   this.checkedCount.map((item, index) => {
	   	if(item.length >= 1){
	   		saleMSG.push(item);
	   	}else{}
	   });
	   this.saleMessageData = [];
	   let attrIDs = [];
	   let x = 0;
	   let y = 0;
	   let z = 0;
	   if(saleMSG.length >= 1) {
		   saleMSG[0].map((item,index) => {
		   		if(saleMSG.length >= 2){
		   			saleMSG[1].map((item2,index2) => {
		   				if(saleMSG.length >= 3){
				   			saleMSG[2].map((item3,index3) => {
				   				this.saleMessageData.push({
				   					key: z++,
				   					message: (item.attrValueName+ ' ' + item2.attrValueName + ' ' + item3.attrValueName),
				   					ifstop: false,
				   					Model: '',
									Number: '',
									Code: '',
									Weight:0,
									Unit: 'g',
									attributes:item.attrId+":"+item.attrValueId+';'+item2.attrId+":"+item2.attrValueId+';'+item3.attrId+":"+item3.attrValueId+';',
				   					//action: <span style = {{cursor: 'pointer'}} key = {z } onClick = {() => {this.changeStatus(z);}}>启动</span>
				   				});
				   				//attrIDs.push(item.attrValueId+ ' ' + item2.attrValueId + ' ' + item3.attrValueId);
				   				attrIDs.push({//最后的SKU信息
									"platformId":2,
									"sellerId":-1,
									"shopId":-1,
									"attributes":item.attrId+":"+item.attrValueId+';'+item2.attrId+":"+item2.attrValueId+';'+item3.attrId+":"+item3.attrValueId+';',
									"modelCode": '',//商品型号
									"barCode" :'' ,//商品条形码
									"productCode" :'', //商品货号
									"weight" :0, //商品毛重
									"skuStatus": 1,// sku 状态,1:有效;0:无效
									"Unit": 'g'
									});
				   			});
				   		}else{
				   			this.saleMessageData.push({
			   					key: y++,
			   					message: (item.attrValueName+ ' ' + item2.attrValueName),
			   					ifstop: false,
			   					Model: '',
								Number: '',
								Code: '',
								Weight:0,
								Unit: 'g',
								attributes:item.attrId+":"+item.attrValueId+';'+item2.attrId+":"+item2.attrValueId+';',

			   					//action: <span style = {{cursor: 'pointer'}} key = {y} onClick = {() => {this.changeStatus(y);}}>启动</span>
			   				});
			   				//attrIDs.push(item.attrValueId+ ' ' + item2.attrValueId );
			   				attrIDs.push({//最后的SKU信息
								"platformId":2,
								"sellerId":-1,
								"shopId":-1,
								"attributes":item.attrId+":"+item.attrValueId+';'+item2.attrId+":"+item2.attrValueId+';',
								"modelCode": '',//商品型号
								"barCode" :'' ,//商品条形码
								"productCode" :'', //商品货号
								"weight" :0, //商品毛重
								"skuStatus": 1,// sku 状态,1:有效;0:无效
								"Unit": 'g'
								});
				   		}
			   		});
		   		}else{
		   			this.saleMessageData.push({
			   					key: x++,
			   					message: (item.attrValueName),
			   					ifstop: false,
			   					Model: '',
								Number: '',
								Code: '',
								Weight:0,
								Unit: 'g',
								attributes: item.attrId+":"+item.attrValueId+';',

			   					//action: <span style = {{cursor: 'pointer'}} key = {x} onClick = {() => {this.changeStatus(x);}}>启动</span>
			   				});
			   		attrIDs.push({//最后的SKU信息
								"platformId":2,
								"sellerId":-1,
								"shopId":-1,
								"attributes": item.attrId+":"+item.attrValueId+';',
								"modelCode": '',//商品型号
								"barCode" :'' ,//商品条形码
								"productCode" :'', //商品货号
								"weight" :0, //商品毛重
								"skuStatus": 1,// sku 状态,1:有效;0:无效
								"Unit": 'g'
								});
		   		}
		   });
		} else {}
	   //将类目属性值传参过去start
	   this.itemPulishVO.itemSkuVoList = attrIDs;
	   let categoryInfos = '';
	   	this.initBrandData.map((item, index) => {
	   		item.platformCategoryAttributeValues.map((item2,index2) => {
	   			if(item2.ifchecked == true){
	   				categoryInfos+=item.attrId+':'+item2.attrValueId+';';
	   			}else{}
	   		});
	   	});
	   	this.itemPulishVO.categoryAttributes = categoryInfos;
	   	let checkedString = '';
		this.initSaleData.map((item,index) => {
			item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.ifchecked === true){
						checkedString += (item2.attrId+':'+item2.attrValueId+':'+item.text+';');
					}else{}
				});
		});
		this.itemPulishVO.specAttributes = checkedString;
		this.props.uploadPrams(this.itemPulishVO);
	   //将类目属性值传参过去end
	   this.setState({
	   	saleData: this.saleData,
	   	brandData: this.brandData,
	   	saleMessageData: this.saleMessageData
	   });
	   this.props.postSaleInfo(this.initSaleData);
	   this.step4 = true;
	   //this.saleMessageData
	   this.props.uploadSaleMessage(this.saleMessageData, true);
	   this.init = false;
   	}
    onChangeBrand(e,val) {
    	console.log('类目属性（包含类目属性和扩展属性）类目属性（包含类目属性和扩展属性）');
		//判断他选了多少行start
		this.init = false;
		let findId;
		if(val){
			findId = val;
		}else{
			findId = e.target.attrId;
		}
		let count = 0;
		this.checkedCount = [];
		let ifHas = false;
		//判断当前选中元素位置
	   /*this.initSaleData.map((item, index1) => {
	   	item.platformCategoryAttributeValues.map((item, index2) => {
	   		if(item.attrValueId == findId){
	   			let ifchecked = !this.saleData[index1].value[index2].props.checked;
	   			this.saleData[index1].value[index2] =  (<Checkbox attrId = {item.attrValueId} checked = {ifchecked} onChange={::this.onChange}> {item.attrValueName} </Checkbox>);
	   			this.initSaleData[index1].platformCategoryAttributeValues[index2].ifchecked = ifchecked;
	   		}else{}
	   	});
	   });*/
	   this.initBrandData.map((item2, index1) => {
	   	item2.platformCategoryAttributeValues.map((item, index2) => {
	   		if(item.attrValueId == findId){
	   			let ifchecked = !this.brandData[index1].value[index2].props.checked;
	   			this.brandData[index1].value[index2] =  (<Checkbox attrId = {item.attrValueId} parentId = {item2.attrId} checked = {ifchecked} onChange={::this.onChangeBrand}> {item.attrValueName} </Checkbox>);
	   			this.initBrandData[index1].platformCategoryAttributeValues[index2].ifchecked = 	ifchecked;
	   		}else{}
	   	});
	   });
	   //再重新获取一下新数组


	   //将类目属性值传参过去start
	   //this.itemPulishVO.itemSkuVoList = attrIDs;
	   let categoryInfos = '';
	   	this.initBrandData.map((item, index) => {
	   		item.platformCategoryAttributeValues.map((item2,index2) => {
	   			if(item2.ifchecked == true){
	   				categoryInfos+=item.attrId+':'+item2.attrValueId+';';
	   			}else{}
	   		});
	   	});
	   	this.itemPulishVO.categoryAttributes = categoryInfos;
	   //将类目属性值传参过去end
	   this.setState({
	   	saleData: this.saleData,
	   	brandData: this.brandData,
	   	saleMessageData: this.saleMessageData
	   });
	   this.props.postSaleInfo(this.initSaleData);
	   this.step4 = true;
   	}
   	initData(data, checkedList = [], ifbrand){
   		//let checkedList = JSON.parse(checkedList);
   		let saleDataValue = [];
		this.detailData = [];
		let ifchecked = false;
		data.map((item,index) => {
			item.platformCategoryAttributeValues.map((item1, index1)=>{

				if(checkedList.length > 0 && checkedList !== undefined && checkedList !== null){ //传过来的数据
				    checkedList.map((itemlist, index2) => { //遍历第条
				    	let keys = [];
				    	for(var key in itemlist){
				    		keys.push(key);
						 }
						 let firstindex = keys[0];
						 if(itemlist[firstindex] !== undefined && itemlist[firstindex] !== null){
							 itemlist[firstindex].map((item2, index3)=>{ //遍历每条里面的数据每个选项
							 	if((+item1.attrValueId) == (+item2) && (+item1.attrId) == (+keys[0])){
									data[index].platformCategoryAttributeValues[index1].ifchecked = true;	
									return;
								}else{
								}
							 });
						}else{}
				    });
				}else{}
			});
		});
		data.map((itemParent, index)=>{
			saleDataValue = [];
			itemParent.platformCategoryAttributeValues.map((item, index)=>{
				if(ifbrand){
					saleDataValue.push(<Checkbox attrId = {item.attrValueId} checked = {item.ifchecked} onChange={(e) => {this.onChangeBrand(e);}}> {item.attrValueName} </Checkbox>);
				}else{
					saleDataValue.push(<Checkbox attrId = {item.attrValueId} checked = {item.ifchecked} onChange={(e) => {this.onChange(e);}}> {item.attrValueName} </Checkbox>);
				}
				
			});
			this.detailData.push({
				key: index,
				name: itemParent.attrName,
				value: saleDataValue,
			});
		});
		if(ifbrand){
			this.initBrandData = data;
		}else{}	
   	}
   	require(record, index){
   		this.setState({
   			currentIndex: index
   		},() => {
   			this.setState({
   				index: index
   			});
   		});
   	}
   	getOptions(data){
   		const options = data.map((item,index) => {
   			return (<Option value = {item}> {item} </Option>);
   		});
   		return options;
   	}
   	getOptionsOperator(data){
   		const options = data.map((item,index) => {
   			return (<Option value = {item.id} id = {item.id} > {item.username} </Option>);
   		});
   		return options;
   	}
   	info() {
	  Modal.info({
	    title: '',
	    content: (
	      <div>
	        <p>{this.errorMSG}</p>
	      </div>
	    ),
	    onOk() {},
	  });
	}
    render() {
	   	this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
	   	let newlist = [];
	   	let newlist2 = [];
	   	if(this.props.editGoods&&this.props.goodsEdit.editGoods&&this.props.goodsEdit.editGoods.id != undefined && this.props.goodsEdit.editGoods!= null &&  this.props.goodsEdit.editGoods!= undefined){
	   		this.checkedList = [];
	   		if(this.initd){
	   			this.editData = this.props.goodsEdit.editGoods;
		   		this.step3 = true;
		   		if(this.step3 && this.step1 && this.step2  && this.step4){
		   			let saleMessageData = [...this.state.saleMessageData];
		   			this.props.goodsEdit.editGoods.itemSkuVoList.map((item,index) => {
		   				saleMessageData[index].Model= item.modelCode;
						saleMessageData[index].Number= item.productCode;
						saleMessageData[index].Code= item.barCode;
						saleMessageData[index].Weight=item.weight;
						saleMessageData[index].Unit= item.Unit;
						if(+item.skuStatus == 1){
								saleMessageData[index].ifstop = false;
							}else{
								saleMessageData[index].ifstop = true;
							}
		   			});
		   			this.setState({saleMessageData: saleMessageData});
		   		}else{}
	   			this.setState({
	   				ifhavedata: true,
	   			},()=>{
	   				this.setState({ifhavedata2: true});
	   			});
	   			this.initd = false;
	   		}else{}
	   		//this.ifhavedata = true;
	   		newlist = this.props.goodsEdit.editGoods.attributesCheck;
	   		newlist2 = this.props.goodsEdit.editGoods.categoryAttributesCheck;
	   		if(newlist !== null &&  newlist!== undefined){
	   			this.checkedList = [];
	   			newlist.map((item, index) => {
		   			this.checkedList.push({
		   				[item.key]:[]
		   			});
		   			if(item.values.length>0){
			   			item.values.map((item2, index2) => {
			   				this.checkedList[index][item.key].push(item2);
			   			});
			   		}else{}
		   		});
	   		}else{}
	   		if(newlist2 !== null &&  newlist2 !== undefined){
	   			this.checkedList2 = [];
	   			newlist2.map((item, index) => {
		   			this.checkedList2.push({
		   				[item.key]:[]
		   			});
		   			if(item.values.length>0){
			   			item.values.map((item2, index2) => {
			   				this.checkedList2[index][item.key].push(item2);
			   			});
			   		}else{}
		   		});
	   		}
	   		//console.log(this.checkedList2,'this.checkedListthis.checkedListthis.checkedListthis.checkedListthis.checkedList');
	   	}else{}
	   if(this.init){
	   		if(this.props.goodsRlease.saleData && this.props.goodsRlease.loaded){
	   			//ifhavedata = true;
	   			this.initSaleData = JSON.parse(JSON.stringify(this.props.goodsRlease.saleData));
	    		this.initData(this.props.goodsRlease.saleData, this.checkedList);
	    		this.saleData = this.detailData;
	    		if(this.saleData.length>0&&this.brandData.length>0){
	    			this.onChange(null,'213');
	    		}else{}
	    		this.step1 = true;
		    		if(this.step3 && this.step1 && this.step2 && this.step4){
			   			let saleMessageData = [...this.state.saleMessageData];
			   			this.props.goodsEdit.editGoods.itemSkuVoList.map((item,index) => { //初始化销售信息下面的数据 
			   				saleMessageData[index].Model= item.modelCode;
							saleMessageData[index].Number= item.productCode;
							saleMessageData[index].Code= item.barCode;
							saleMessageData[index].Weight=item.weight;
							saleMessageData[index].Unit= item.Unit;
							if(+item.skuStatus == 1){
								saleMessageData[index].ifstop = false;
							}else{
								saleMessageData[index].ifstop = true;
							}
			   			});
			   			this.setState({saleMessageData: saleMessageData});
			   		}else{}

	    	}else{}
	    	if(this.props.goodsRlease.brandData && this.props.goodsRlease.loaded){
	    		//ifhavedata = true;
	    		this.initBrandData = JSON.parse(JSON.stringify(this.props.goodsRlease.brandData));
	    		this.initData(this.props.goodsRlease.brandData, this.checkedList2,true);
	    		this.brandData = this.detailData;
	    		if(this.saleData.length>0&&this.brandData.length>0){
	    			this.onChange(null,'213');
	    		}else{}
	    		this.step2 = true;
				  if(this.step3 && this.step1 && this.step2 && this.step4){
			   			let saleMessageData = this.saleMessageData;
			   			this.props.goodsEdit.editGoods.itemSkuVoList.map((item,index) => { //初始化销售信息下面的数据 
			   				this.saleMessageData[index].Model= item.modelCode;
							this.saleMessageData[index].Number= item.productCode;
							this.saleMessageData[index].Code= item.barCode;
							this.saleMessageData[index].Weight=item.weight;
							this.saleMessageData[index].Unit= item.Unit;
							if(+item.skuStatus == 1){
								this.saleMessageData[index].ifstop = false;
							}else{
								this.saleMessageData[index].ifstop = true;
							}
			   			});
			   			this.setState({saleMessageData: this.saleMessageData});
			   		}else{}

	    	}else{}
	   }else{}
	   if(this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.itemName && this.firstLoad){
	   		this.itemPulishVO = JSON.parse(JSON.stringify(this.props.goodsEdit.editGoods));
	   		this.props.uploadPrams(this.itemPulishVO);
	   		this.firstLoad = false;
	   }else{}
      return (
      	<div className = {styles.basic}>
      		<strong className = {styles.strongstyle}>基本信息</strong>
      			<div className = {styles.outDiv}>
                  	<label htmlFor="" className = {styles.la}><i style ={{color: '#f04134'}}>*</i>商品名称：</label>
                  	{!this.props.editGoods && <Input className = {styles.inputname} maxLength="100" placeholder="输入名称" size="default" onBlur= {::this.changeGoodsName}/>}
                    {this.props.editGoods && (this.props.goodsEdit.editGoods.itemName || this.props.goodsEdit.editGoods.itemName == '') && <Input className = {styles.inputname} maxLength="100" placeholder="输入名称" size="default" defaultValue = {this.props.goodsEdit.editGoods.itemName} onBlur= {::this.changeGoodsName}/>}
                </div>
                <p style = {this.name ? {marginLeft: '91px', color: '#f04134'}: {marginLeft: '91px', color: 'transparent'}}>用户名不能为空</p>
                
	                <div className = {styles.outDiv} style = {{marginTop: '5px'}}>
	               		<label htmlFor="" className = {styles.la}><i style ={{color: '#f04134'}}>*</i>平台分类：</label>
	               		 {!this.props.editGoods && <Provider store={this.store1}>
               				<CategoryCascade isShowAllCategory = {true} className = {styles.inputname} onChangeCategoryValue = {(value) => this.handleCategoryChange(value)}></CategoryCascade>
 	                     </Provider>}
	                    {this.props.editGoods && <Provider store={this.store1}>
	                    	<CategoryCascade isShowAllCategory = {true} categoryEdit = {this.props.editGoods} categoryData = {this.props.editGoods && this.props.goodsEdit.editGoods.cNames} className = {styles.inputname} onChangeCategoryValue = {(value) => this.handleCategoryChange(value)}></CategoryCascade>
	                	</Provider>}
	                </div>
	                <p style = {false ? {marginLeft: '91px', color: '#f04134'} : {marginLeft: '91px', color: 'transparent'}}>平台分类不能为空</p>
	                <div className = {styles.outDiv} style = {{marginTop: '5px',marginLeft: '16px'}}>
	                  	<label htmlFor="" className = {styles.la}>第二分类：</label>
	                  	{!this.props.editGoods && <Provider store={this.store2}>
	                  		<CategoryCascade isShowAllCategory = {true} className = {styles.inputname} onChangeCategoryValue = {(value) => this.handleSecondCategoryChange(value)}></CategoryCascade>
	                  	 </Provider>}
	                    {this.props.editGoods && <Provider store={this.store2}>
                    		<CategoryCascade isShowAllCategory = {true} categoryEdit = {this.props.editGoods} categoryData = {this.props.editGoods && this.props.goodsEdit.editGoods.cNames} className = {styles.inputname} onChangeCategoryValue = {(value) => this.handleSecondCategoryChange(value)}></CategoryCascade>
			        	</Provider>}
			        </div>
		        <div className = {styles.outDiv} style = {{marginLeft: '16px'}}>
		            <label htmlFor="" className = {styles.la} style = {{marginLeft: '34px'}}>品牌：</label>
		            <BrandSelect  goods = {true} goodsBrand = {this.props.brandSelect && this.props.brandSelect.data && this.props.brandSelect.data.data} brandSelectData = {this.props.editGoods && this.props.goodsEdit.editGoods.brandName} gcid = {this.state.selectCid} brandId = {this.props.goodsRlease.itemPulishVO.brandName} style = {{float: 'left'}} className = {styles.inputname} onChangeBrandValue = {(value) => this.handleBrandSelectChange(value)} edit = {true} ></BrandSelect>
		            {this.state.ifAddBrand &&  <Input className = {styles.inputname} placeholder="输入品牌名称" size="default" onBlur = {::this.addBrand} style ={{width: '100px', marginLeft: '78px',marginTop: '5px'}}/>}
		        </div>
		        <p style = {this.state.ifBrandName ? {marginLeft: '91px', color: '#f04134'} : {marginLeft: '91px', color: 'transparent'}}>平台分类不能为空</p>
		    	<div className = {styles.outDiv} style = {{marginTop: '5px',marginLeft: '16px'}}>
	    			<label htmlFor="" className = {styles.la}>计量单位：</label>
		            {!this.props.editGoods && 
		            	<Select className = {styles.inputname} defaultValue = {this.state.ifhavedata && this.editData.unit} placeholder="请选择计量单位" onChange={::this.handleSelectmeasuring}>
			              {this.props.goodsRlease.unitData && this.getOptions(this.props.goodsRlease.unitData)}
			            </Select>
		            }
                    {this.props.editGoods && 
                    (this.props.goodsEdit.editGoods.unit || this.props.goodsEdit.editGoods.unit == '') 
                    	&& 
                    	<Select className = {styles.inputname} defaultValue = {this.props.goodsEdit.editGoods.unit} placeholder="请选择计量单位" onChange={::this.handleSelectmeasuring}>
			              {this.props.goodsRlease.unitData && this.getOptions(this.props.goodsRlease.unitData)}
			            </Select>
                	}
			    </div>
			    <div className = {styles.outDiv} style = {{marginLeft: '16px'}}>
                  	<label htmlFor="" className = {styles.la} style = {{marginLeft: '35px'}}>产地：</label>
                  	{/*!this.props.editGoods && <Input className = {styles.inputname}  maxLength="100" size="default" onBlur = {::this.changePlace}/>*/}
                    {
                    	!this.props.editGoods && <Input className = {styles.inputname}   placeholder="请输入产地" maxLength="100" size="default" onBlur = {::this.changePlace}/>}
                    	{this.props.editGoods && this.props.goodsEdit.editGoods.origin && <Input placeholder="请输入产地" className = {styles.inputname}   defaultValue = {this.props.goodsEdit.editGoods.origin} maxLength="100" size="default" onBlur = {::this.changePlace}/>}
                    	{this.props.editGoods && !this.props.goodsEdit.editGoods.origin && <Input className = {styles.inputname}   placeholder="请输入产地" maxLength="100" size="default" onBlur = {::this.changePlace}/>}
                </div>
            {/*this.state.saleData.length > 0 || this.saleData.length > 0 &&*/} <strong className = {styles.strongstyle}>销售规格</strong>
            {/*this.state.saleData.length > 0 || this.saleData.length > 0 && */}<Table bordered className = {styles.tablestyle} columns={ this.saleColumns} dataSource={this.init ? this.saleData : this.state.saleData} pagination = {false} />
            {/*this.state.brandData.length > 0 || this.brandData.length > 0 && */}<strong className = {styles.strongstyle}>类目属性<em style = {{fontSize: '12px', color: '#999'}}>（包含类目属性和扩展属性）</em></strong>
            {/*this.state.brandData.length > 0 || this.brandData.length > 0 && */}<Table bordered className = {styles.tablestyle} columns={this.saleColumns} dataSource={this.init ? this.brandData : this.state.brandData} pagination = {false}/>
            {this.state.saleMessageData.length > 0 && <strong className = {styles.strongstyle}>销售信息</strong>}
            {this.state.saleMessageData.length >= 1 && (<Table bordered onRowClick = {::this.require} className = {styles.tablestyle} columns={this.saleMessage} dataSource={this.state.saleMessageData} pagination = {false}/>)}
            <strong className = {styles.strongstyle}>管理员信息</strong>
          	<label htmlFor="" className = {styles.la}>商品发布：</label>
            <Select defaultValue = {'吴楠'} className = {styles.inputname} disabled = {this.props.editGoods} placeholder="请选择" onChange = {::this.changePromulgator}>
              <Option value="20">吴楠</Option>
            </Select>
          	<label htmlFor="" className = {styles.la} style = {{marginLeft: '20px'}}>商品运营：</label>
          	{!this.props.editGoods && <Select className = {styles.inputname} placeholder="请选择" onChange = {::this.changeOperators}>
                           {this.props.goodsRlease.operators && this.getOptionsOperator(this.props.goodsRlease.operators)}
                        </Select>}
            {this.props.editGoods &&this.props.goodsEdit.editGoods.operatorId && <Select className = {styles.inputname} defaultValue = {this.props.goodsEdit.editGoods.operatorId} placeholder="请选择" onChange = {::this.changeOperators}>
                           {this.props.goodsRlease.operators && this.getOptionsOperator(this.props.goodsRlease.operators)}
                        </Select>}
      	</div>
      )
    }
}