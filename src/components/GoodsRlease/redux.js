/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布
 ****************************************************************/
const GOODS_LOADING = 'redux/GOODSRLEASE/LOADING';
const GOODS_LOAD_SUCCESS = 'redux/GOODSRLEASE/LOAD_SUCCESS';
const GOODS_LOADING_FAIL = 'redux/GOODSRLEASE/LOADING_FAIL';

//获取销售属性
const GOODS_SALE = 'redux/GOODSRLEASE/GOODS_SALE';
const GOODS_SALE_SUCCESS = 'redux/GOODSRLEASE/GOODS_SALE_SUCCESS';
const GOODS_SALE_FAIL = 'redux/GOODSRLEASE/GOODS_SALE_FAIL';

//获取类目属性
const GOODS_BRAND = 'redux/GOODSRLEASE/GOODS_BRAND';
const GOODS_BRAND_SUCCESS = 'redux/GOODSRLEASE/GOODS_BRAND_SUCCESS';
const GOODS_BRAND_FAIL = 'redux/GOODSRLEASE/GOODS_BRAND_FAIL';

//获取单位
const GOODS_UNIT = 'redux/GOODSRLEASE/GOODS_UNIT';
const GOODS_UNIT_SUCCESS = 'redux/GOODSRLEASE/GOODS_UNIT_SUCCESS';
const GOODS_UNIT_FAIL = 'redux/GOODSRLEASE/GOODS_UNIT_FAIL';

//获取运营者
const GOODS_OPERATORS = 'redux/GOODSRLEASE/GOODS_OPERATORS';
const GOODS_OPERATORS_SUCCESS = 'redux/GOODSRLEASE/GOODS_OPERATORS_SUCCESS';
const GOODS_OPERATORS_FAIL = 'redux/GOODSRLEASE/GOODS_OPERATORS_FAIL';

//获取发布者
const GOODS_PUBLISHER = 'redux/GOODSRLEASE/GOODS_PUBLISHER';
const GOODS_PUBLISHER_SUCCESS = 'redux/GOODSRLEASE/GOODS_PUBLISHER_SUCCESS';
const GOODS_PUBLISHER_FAIL = 'redux/GOODSRLEASE/GOODS_PUBLISHER_FAIL';

const GOODS_SALEINFO_AFTER = 'redux/GOODSRLEASE/GOODS_SALEINFO_AFTER';
const GOODS_SALEINFO_AFTER_SUCCESS = 'redux/GOODSRLEASE/GOODS_SALEINFO_AFTER_SUCCESS';
const GOODS_SALEINFO_AFTER_FAIL = 'redux/GOODSRLEASE/GOODS_SALEINFO_AFTER_FAIL';

// 获取规格参数start
const CATEGORY_LOADING = 'redux/GOODSRLEASE/CATEGORY_LOADING';
const CATEGORY_SUCCESS = 'redux/GOODSRLEASE/CATEGORY_SUCCESS';
const CATEGORY_FAIL = 'redux/GOODSRLEASE/CATEGORY_FAIL';
// 获取规格参数end
const UPLOADPRAMAS = 'redux/GOODSRLEASE/UPLOADPRAMAS';
//发布新商品供货信息的sku
const UPLOADSALEDATA = 'redux/GOODSRLEASE/UPLOADSALEDATA';
const UPLOADSALEDATA_COMPLETE = 'redux/GOODSRLEASE/UPLOADSALEDATA_COMPLETE';
const UPLOADSALEDATA_FAIL = 'redux/GOODSRLEASE/UPLOADSALEDATA_FAIL';
//发布新商品供货信息的sku

const initialState = {
	loading: false,
	loaded: false,
	releasData:{},
	saleData:  [
	   /* {
	      "id": 1,
	      "attrName": '颜色',
	      "platformId": 2,
	      "attrId": 1000606,
	      "cid": null,
	      "hasSaleAttr": null,
	      "hasCategoryAttr": null,
	      "hasBaseAttr": null,
	      "hasExtendAttr": null,
	      "sortNumber": null,
	      "selectType": null,
	      "optionType": null,
	      "features": null,
	      "status": null,
	      "attrNameType": null,
	      "created": null,
	      "modified": null,
	      "yn": null,
	      "isUsed": null,
	      "platformCategoryAttributeValues": [
	        {
	          "id": 11,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001312,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "红色",
	          "status": 1,
	          "ifCheck": true
	        },
	         {
	          "id": 12,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001313,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "蓝色",
	          "status": 1,
	          "ifCheck": null
	        }
	      ]
	    },
	    {
	      "id": 2,
	      "attrName": '容量',
	      "attrId": 1000607,
	      "platformId": 2,
	      "cid": null,
	      "hasSaleAttr": null,
	      "hasCategoryAttr": null,
	      "hasBaseAttr": null,
	      "hasExtendAttr": null,
	      "sortNumber": null,
	      "selectType": null,
	      "optionType": null,
	      "features": null,
	      "status": null,
	      "attrNameType": null,
	      "created": null,
	      "modified": null,
	      "yn": null,
	      "isUsed": null,
	      "platformCategoryAttributeValues": [
	        {
	          "id": 21,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001314,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "1T",
	          "status": 1,
	          "ifCheck": true
	        },
	         {
	          "id": 22,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001315,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "2T",
	          "status": 1,
	          "ifCheck": null
	        }
	      ]
	    },
	    {
	      "id": 3,
	      "attrName": '形状',
	      "attrId": 1000608,
	      "platformId": 2,
	      "cid": null,
	      "hasSaleAttr": null,
	      "hasCategoryAttr": null,
	      "hasBaseAttr": null,
	      "hasExtendAttr": null,
	      "sortNumber": null,
	      "selectType": null,
	      "optionType": null,
	      "features": null,
	      "status": null,
	      "attrNameType": null,
	      "created": null,
	      "modified": null,
	      "yn": null,
	      "isUsed": null,
	      "platformCategoryAttributeValues": [
	        {
	          "id": 31,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001316,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "长方形",
	          "status": 1,
	          "ifCheck": true
	        },
	         {
	          "id": 32,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001317,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "圆形",
	          "status": 1,
	          "ifCheck": null
	        }
	      ]
	    },
	    {
	      "id": 4,
	      "attrName": '销售属性3',
	      "attrId": 1000609,
	      "platformId": 2,
	      "cid": null,
	      "hasSaleAttr": null,
	      "hasCategoryAttr": null,
	      "hasBaseAttr": null,
	      "hasExtendAttr": null,
	      "sortNumber": null,
	      "selectType": null,
	      "optionType": null,
	      "features": null,
	      "status": null,
	      "attrNameType": null,
	      "created": null,
	      "modified": null,
	      "yn": null,
	      "isUsed": null,
	      "platformCategoryAttributeValues": [
	        {
	          "id": 41,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1004,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "长方形8",
	          "status": 1,
	          "ifCheck": null
	        },
	         {
	          "id": 42,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 105,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "圆形",
	          "status": 1,
	          "ifCheck": null
	        }
	      ]
	    }*/
	  ],
	brandData:  [
	   /* {
	      "id": 1,
	      "attrName": '类目属性3',
	      "platformId": 2,
	      "attrId": 1000606,
	      "cid": null,
	      "hasSaleAttr": null,
	      "hasCategoryAttr": null,
	      "hasBaseAttr": null,
	      "hasExtendAttr": null,
	      "sortNumber": null,
	      "selectType": null,
	      "optionType": null,
	      "features": null,
	      "status": null,
	      "attrNameType": null,
	      "created": null,
	      "modified": null,
	      "yn": null,
	      "isUsed": null,
	      "platformCategoryAttributeValues": [
	        {
	          "id": 10,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001312,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "长方形8",
	          "status": 1,
	          "ifCheck": null
	        },
	         {
	          "id": 12,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001317,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "圆形",
	          "status": 1,
	          "ifCheck": null
	        }
	      ]
	    },
	    {
	      "id": 2,
	      "attrName": '类目属性4',
	      "platformId": null,
	      "attrId": 1000606,
	      "cid": null,
	      "hasSaleAttr": null,
	      "hasCategoryAttr": null,
	      "hasBaseAttr": null,
	      "hasExtendAttr": null,
	      "sortNumber": null,
	      "selectType": null,
	      "optionType": null,
	      "features": null,
	      "status": null,
	      "attrNameType": null,
	      "created": null,
	      "modified": null,
	      "yn": null,
	      "isUsed": null,
	      "platformCategoryAttributeValues": [
	        {
	          "id": 21,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001318,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "长方形8",
	          "status": 1,
	          "ifCheck": null
	        },
	         {
	          "id": 25,
	          "platformId": 2,
	          "cid": 1000087,
	          "attrId": 1000606,
	          "attrValueId": 1001319,
	          "sortNumber": 1,
	          "created": null,
	          "modified": null,
	          "yn": 1,
	          "attrValueName": "圆形",
	          "status": 1,
	          "ifCheck": null
	        }
	      ]
	    }*/
	  ],
	saleMessage: [],//生成的SKU信息
	unitData:[],
	publisher: [],
	operators:[],
	saleInfoAfter: [],
	saleloaded: false,
	platformId: 2,
	itemPulishVO: {
		 "platformId":2,
		  "sellerId":-1,//运营平台-1
		  "shopId":-1, //运营平台-1
		  "operatorId":5566,//运营人员id 未写发布人员
		  "publishuserId":20,
		  "itemName":"",//商品名称
		  "cid":null,//一级分类
		  "secondCid": null,//二级分类ID
		  "brandId":  null,//品牌ID
		  "unit":  null,//单位
		  "origin": null,//商品产地
		  "addSource":1,//1运营平台 2供应商
		  "describeUrl": '',//商品详情
		  "operator":1,//1运营平台 2供应商
		  "categoryAttributes": '',  //商品类目属性keyId:valueId
		  "specAttributes":'',  //规格参数属性串keyid:valueId:valueDesc;
		  "itemSaleInfoVo":{//销售方式
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "saleType":1,//1按单品2按总量
			    "initialMount":1,//起订数量
			    "deliveryCycle":4//交货周期
		  },
		  "itemDeliveryInfoVo":{//运费信息
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "deliveryType":1,//1包邮 2 运费到付
			    "homeDelivery":0//0不支持 1 支持
		  },"itemPictureVoList":[/*{
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "pictureUrl":"XXXXXX",//图片URL
			    "sortNumber":1,
			    "altImages":"CCCCCCC"//图片标签
		  }*/],"itemPicpdfManualVoList":[/*{
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "picpdfUrl":"CCCCCC", //pdf地址
			    "picpdfName":"SSSSSS" //名称
		  }*/],"itemAfterSaleVo":{//售后说明
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "refundService":1,//退货 1不允许退货 2 允许退货
			    "changeService":14, //换货
			    "refundDuration":7, //退货时长
			    "changeDuration":15, //换货时长
			    "repaireDuration":15 //质保时长
		  },"itemSkuPictureVoList":[/*{
				"platformId":2,
				"sellerId":-1,
				"shopId":-1,
				"attributes":"",//销售属性串
				"pictureUrl":"",//地址
				"sortNumber":1 //图片顺序
			}*/],"itemSkuVoList":[/*{//最后的SKU信息
				"platformId":2,
				"sellerId":-1,
				"shopId":-1,
				"attributes":"",
				"modelCode": '',//商品型号
				"barCode" :'' ,//商品条形码
				"productCode" :'', //商品货号
				"weight" :'', //商品毛重
				"skuStatus":'',// sku 状态,1:有效;0:无效
				}*/
			],"packingList":'',
	}
};
export default function reducer(state = initialState, action = {}) {
	switch(action.type) {
		case GOODS_LOADING:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_LOAD_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		releasData: action.result
			};
		case GOODS_LOADING_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};

		//获取销售属性信息
		case GOODS_SALE:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_SALE_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		saleData: action.result.data
			};
		case GOODS_SALE_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		//获取类目属性信息

		case GOODS_BRAND:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_BRAND_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		brandData: action.result.data
			};
		case GOODS_BRAND_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		//获取计量单位
		case GOODS_UNIT:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_UNIT_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		unitData: action.result.data
			};
		case GOODS_UNIT_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		//获取发布者信息
		case GOODS_PUBLISHER:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_PUBLISHER_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		publisher: action.result
			};
		case GOODS_PUBLISHER_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		//获取运营者信息
		case GOODS_OPERATORS:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_OPERATORS_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		operators: action.result.data
			};
		case GOODS_OPERATORS_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		case GOODS_SALEINFO_AFTER:
		     return {
		     	...state,
		     	loading: false,
        		saleloaded: false,
		     };
		case GOODS_SALEINFO_AFTER_SUCCESS:
		     return {
		     	...state,
		     	loading: false,
        		saleloaded: true,
        		saleData: action.data
		     }
		case GOODS_SALEINFO_AFTER_FAIL:
		     return {
		     	...state,
		     	loading: false,
        		saleloaded: false,
		     }
		case UPLOADPRAMAS:
			return {
		     	...state,
		     	loading: false,
        		loaded: true,
        		itemPulishVO: action.data
		     }
		//uploadsaledata
		case UPLOADSALEDATA:
			return {
		     	...state,
		     	loading: false,
        		saleMsgloaded: true,
        		saleMessage: action.data,
        		ifUp: action.ifUp
		     }
		case UPLOADSALEDATA_COMPLETE:
			return {
		     	...state,
		     	loading: false,
		     	saleMsgloaded: false,
		     	ifUp: action.data,
		     }
		case UPLOADSALEDATA_FAIL:
			return {
		     	...state,
		     	loading: false,
		     	saleMsgloaded: false,
		     }
		//uploadsaledata END
		case CATEGORY_LOADING:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case CATEGORY_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		categoryData: action.result
			};
		case CATEGORY_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		default:
			return {
				...state,
			};
	}
}
export function getGoodsInfo(param){
		return {
			types: [GOODS_LOADING, GOODS_LOAD_SUCCESS, GOODS_LOADING_FAIL],
	    	promise: (client) => client.get('/item/platform/categoryAttribute/queryPlatformCategoryAttributeByAttrID', {
	    		params: param
	    	})
		}
	}
//获取销售属性
export function getSaleInfo(param){
		return {
			types: [GOODS_SALE, GOODS_SALE_SUCCESS, GOODS_SALE_FAIL],
	    	promise: (client) => client.get('/item/platform/categoryAttribute/querySaleAttr', {
	    		params: param
	    	})
		}
	}
//获取类目属性
export function getBrandInfo(param){
		return {
			types: [GOODS_BRAND, GOODS_BRAND_SUCCESS, GOODS_BRAND_FAIL],
	    	promise: (client) => client.get('/item/platform/categoryAttribute/queryCategoryAttr', {
	    		params: param
	    	})
		}
	}
//获取计量单位
export function getUnitInfo(param){
		return {
			types: [GOODS_UNIT, GOODS_UNIT_SUCCESS, GOODS_UNIT_FAIL],
	    	promise: (client) => client.get('/item/platform/category/queryUnitByCategoryId', {
	    		params: param
	    	})
		}
	}

//获取发布者信息 //先写死
export function getPublisherInfo(param){
		return {
			types: [GOODS_PUBLISHER, GOODS_PUBLISHER_SUCCESS, GOODS_PUBLISHER_FAIL],
	    	promise: (client) => client.get('platform-passport/itemPublish/queryPublishUser')
		}
	}
//获取运营者信息
export function getOperatorInfo(param){
		return {
			types: [GOODS_OPERATORS, GOODS_OPERATORS_SUCCESS, GOODS_OPERATORS_FAIL],
	    	promise: (client) => client.get('platform-passport/user/queryAllAdminUser', {
	    		params: param
	    	})
		}
	}
// 更改后属性信息
export function postSaleInfo(data){
		return {
			type: GOODS_SALEINFO_AFTER_SUCCESS,
	    	data: data
		}
	}
export function uploadPrams(data){
		return {
			type: UPLOADPRAMAS,
	    	data: data
		}
	}
export function uploadSaleMessage(data){
		return {
			type: UPLOADSALEDATA,
	    	data: data,
	    	ifUp: true
		}
	}
export function changeifUp(){
		return {
			type: UPLOADSALEDATA_COMPLETE,
	    	data: false,
		}
	}
export function release(param,url){
	return {
			types: [GOODS_LOADING, GOODS_LOAD_SUCCESS, GOODS_LOADING_FAIL],
	    	promise: (client) => client.post(url, {
	    		//data: "itemPublishVo=" + JSON.stringify(param)
	    		data: param
	    	})
		}
	}
//规格参数数据获取
export function findCategory(param){
	return {
			types: [CATEGORY_LOADING, CATEGORY_SUCCESS, CATEGORY_FAIL],
	    	promise: (client) => client.post('/item/platform/categoryAttribute/queryPlatfromAttributeList', {
	    		//data: "itemPublishVo=" + JSON.stringify(param)
	    		data: param
	    	})
		}
	}