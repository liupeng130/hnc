/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:编辑产品
 ****************************************************************/
const GOODS_LOADING = 'redux/GOODSRLEASE/LOADING';
const GOODS_LOAD_SUCCESS = 'redux/GOODSRLEASE/LOAD_SUCCESS';
const GOODS_LOADING_FAIL = 'redux/GOODSRLEASE/LOADING_FAIL';

const initialState = {
	loading: false,
	loaded: false,
	editGoods:{
		 /*"platformId":2,
		  "sellerId":-1,//运营平台-1
		  "shopId":-1, //运营平台-1
		  "operatorId":5566,//运营人员id
		  "itemName":"aiyayayay",//商品名称
		  "cid":1000087,//一级分类 
		  "secondCid": null,//二级分类ID
		  "brandId":null,//品牌ID
		  "unit":null,//单位
		  "origin":null,//商品产地
		  "addSource":1,//1运营平台 2供应商
		  "describeUrl":"XXXXXX",//商品详情
		  "operator":1,//1运营平台 2供应商
		  "categoryAttributes": '',  //商品类目属性keyId:valueId
		  "specAttributes":'',  //规格参数属性串keyid:valueId:valueDesc;
		  "itemSaleInfoVo":{//销售方式
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "saleType":1,//1按单品2按总量
			    "initialMount":10,//起订数量
			    "deliveryCycle":5//交货周期
		  },
		  "itemDeliveryInfoVo":{//运费信息
			    "platformId":2, 
			    "sellerId":-1,
			    "shopId":-1,
			    "deliveryType":1,//1包邮 2 运费到付
			    "homeDelivery":0//0不支持 1 支持
		  },"itemPictureVoList":[{
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1, 
			    "pictureUrl":"XXXXXX",//图片URL
			    "sortNumber":1,
			    "altImages":"CCCCCCC"//图片标签
		  }],"itemPicpdfManualVoList":[{
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "picpdfUrl":"CCCCCC", //pdf地址
			    "picpdfName":"SSSSSS" //名称
		  }],"itemAfterSaleVo":{//售后说明
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "refundService":1,//退货 1不允许退货 2 允许退货
			    "changeService":1, //换货
			    "refundDuration":1, //退货时长 
			    "changeDuration":1, //换货时长
			    "repaireDuration":1 //质保时长
		  },"itemSkuPictureVoList":[{
				"platformId":2,
				"sellerId":-1,
				"shopId":-1,
				"attributes":"aa:11;bb:22@",//销售属性串
				"pictureUrl":"NNNNNNNNN",//地址
				"sortNumber":1 //图片顺序
			}],"itemSkuVoList":[{//最后的SKU信息
				"platformId":2,
				"sellerId":-1,
				"shopId":-1,
				"attributes":"aa:11;bb:22",
				"modelCode": '',//商品型号
				"barCode" :'' ,//商品条形码
				"productCode" :'', //商品货号
				"weight" :'', //商品毛重
				"skuStatus":'',// sku 状态,1:有效;0:无效
				}
			],"packingList":''*/
		},
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
        		editGoods: action.result.data
			};
		case GOODS_LOADING_FAIL:

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
export function editGoodsInfo(param){
		return {
			types: [GOODS_LOADING, GOODS_LOAD_SUCCESS, GOODS_LOADING_FAIL],
	    	promise: (client) => client.get('item/platform/itemPublish/queryItemInfo', {
	    		params: param
	    	})
		}
	}
