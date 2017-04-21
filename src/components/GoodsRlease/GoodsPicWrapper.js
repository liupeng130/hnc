/****************************************************************
 * author:LiuPeng
 * date:2017-02-20
 * description:产品发布-图片上传-外层
 ****************************************************************/
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from '../Common/BaseComponent';
import {getGoodsInfo,uploadPrams,uploadPicture} from './redux';
import { GoodsPic} from '../../components'
import { Radio , Table ,Pagination} from 'antd';
import styles from './style/GoodsPic.less';
const RadioGroup = Radio.Group;
@connect(
  state => ({
    goodsRlease:state.goodsRlease,
    goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({getGoodsInfo,uploadPrams,uploadPicture}, dispatch)
)
export default class GoodsPicWrapper extends BaseComponent{
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 0
    };
    //传给后端的所有数据
    this.picAllDate = {
                      'itemPictureVoList':[],     //商品图片
                      'itemSkuPictureVoList':[]   //SKU图片
                      };
    this.dataSource = [];     //table表格的数据源
    this.dataColumns = [];    //table表格的列
    this.itemPulishVO = [];
    this.initialArr = [];
    this.saleData = [];       //所有对应得属性和属性名
    this.itemSkuVoList =[];   //所有生成的SKU基础信息
    this.attrValueName = [];
    this.attrKeys = [];
    this.columnsKeys = [];
    this.targetNum = 0;      //初始化Tab默认值
    this.attrId = null;
    this.attrValueId = null;
    this.attributes = [];
    this.staticSource = [];   //获取的完整的静态数据源
    this.allAttrName = [];
    this.changeColumnsKeys =[];
    this.setPics = [];
    this.actionPic = [];
    this.initialParent = [];
    this.initialChildren = [];
  }
  componentWillMount() {
    this.handleInit();
    this.makeInitialArr();
    //编辑状态数据回显
    if(this.props.editGoods){
      this.makeInitialReplay();
    }
    this.saleData.map((item,index) =>{
      this.allAttrName.push(item.attrName)
    });
    this.staticSource = JSON.parse(JSON.stringify(this.dataSource));
  }
  /*
  * 编辑是数据的回显
  * */
  makeInitialReplay(){
    let itemPictureVoList = this.props.goodsEdit.editGoods.itemPictureVoList;
    let itemSkuPictureVoList = this.props.goodsEdit.editGoods.itemSkuPictureVoList;
    let itemSkuVoList = this.props.goodsEdit.editGoods.itemSkuVoList;

    //编辑状态下保存的数据传给对应的展示项目
    if(itemPictureVoList&&itemPictureVoList.length>0){
      itemPictureVoList.map((item1,index1) => {
        this.initialParent.push({
          alt:item1.altImages,
          url:item1.pictureUrl
        })
      })
    }
    console.log(itemSkuPictureVoList)
    console.log(itemSkuVoList)
    /*this.itemPulishVO.itemSkuPictureVoList = itemSkuPictureVoList;
    this.props.uploadPrams(this.itemPulishVO);*/
   for(let i = 0;i<itemSkuPictureVoList.length;i++){
      this.initialChildren.push([])
    }
    let diff = [];
    if(itemSkuPictureVoList&&itemSkuPictureVoList.length>0){
      itemSkuPictureVoList.map((item2,index2) => {
        diff.push(item2.attributes)
      })
    }
    diff  = [...new Set(diff)]     //数组去重
    if(diff!==[]&&diff.length>0){
      diff.map((item3,index3) =>{
        itemSkuPictureVoList.map((item4,index4) => {
          if(item3 ==item4.attributes){
            this.initialChildren[index3].push({
              alt:'',
              url:item4.pictureUrl
            })
          }
        })
      })
    }
    console.log(this.initialChildren)
    if(itemSkuVoList !==null&&itemSkuVoList.length > 0){
      this.makeInitialSourceData(itemSkuVoList.length);
      itemSkuVoList.map((item,index) => {
        this.attrValueName = [];
        this.attrKeys = [];
        let firstarr = item.attributes.split(';');
        firstarr.map((item1,index1) => {
          let secondarr = item1.split(':');
          this.getSkuValueName(secondarr[1]);
          this.getSkuAttrName(secondarr[0])
        })
        this.columnsKeys = this.attrKeys;
        console.log(this.columnsKeys);
        this.changeColumnsKeys = JSON.parse(JSON.stringify(this.columnsKeys));
        /*
        * 初始化Table数据源dataSource
        * */
        this.dataSource[index].key = index+1;
        this.attrValueName.map((item2,index2) => {
          this.dataSource[index][this.attrKeys[index2]]= item2;
        });
        this.dataSource[index].oncallbackchirld = this.oncallbackchirld.bind(this);
        this.dataSource[index].pics = this.initialChildren[index];
      });
      /*
      * 初始化Table列数dataColumns
      * */
      this.makeInitialColumns(this.columnsKeys.length);
      this.columnsKeys.map((item3,index3) => {
        this.dataColumns[index3].key = item3;
        this.dataColumns[index3].dataIndex = item3;
        this.dataColumns[index3].render = text =>(
          <div>{text instanceof Array?text.map(item4=><p>{item4}</p>):text} </div>
        )
      });
      this.dataColumns.push({
        key: 'action',
        render: (text, record) => (
          <GoodsPic oncallbackchirld={record.oncallbackchirld} record={record} ></GoodsPic>
        )
      })
    }
    console.log(this.dataSource)
  }
  /*
  * 初始化SKU数据的总长度
  * */
  makeInitialArr(){
    this.initialArr = [];
    let lenArr = this.dataSource.length;
    for(let i = 0;i < lenArr;i++){
      this.initialArr.push([])
    }
  }
  /*
  * 初始化table表格数据源的长度
  * */
  makeInitialSourceData(len){
    this.dataSource = [];
    for(let i = 0;i < len;i++){
      this.dataSource.push({})
    }
  }
  /*
  * 初始化table表格列的个数
  * */
  makeInitialColumns(len){
    this.dataColumns  = [];
    for(let i = 0;i < len;i++){
      this.dataColumns.push({})
    }
  }
  /*
  * 初始化每行传到后台attributes的长度
  * */
  makeInitialAttr(){
    this.attributes = [];
    let lenArr = this.dataSource.length;
    for(let i = 0;i < lenArr;i++){
      this.attributes.push([])
    }
  }
  /*
  * SKU图片那一列的imageurl和alt
  * */
  makeInitialSetPics(len){
    this.setPics = [];
    for(let i = 0;i < len;i++){
      this.setPics.push([])
    }
  }
  /*
  * 通过attrValueId查到SkuValueName
  * */
  getSkuValueName(code){
    this.saleData.map((item,index) => {
      item.platformCategoryAttributeValues.map((item1,index1) => {
           if(item1.attrValueId == code ){
                this.attrValueName.push(item1.attrValueName)
           }
       })
    })
  }
  /*
   * 通过attrId查到SkuAttrName
   * */
  getSkuAttrName(code){
    this.saleData.map((item,index) => {
        if(item.attrId == code ){
          this.attrKeys.push(item.attrName)
      }
    })
  }
  /*
   * 通过SkuAttrName查到attrId
   * */
  getSkuAttrId(name){
    this.saleData.map((item,index) => {
      if(item.attrName == name ){
        this.attrId = item.attrId;
      }
    })
  }
  /*
   * 通过SkuValueName查到attrValueId
   * */
  getSkuAttrValueId(valueName){
    this.saleData.map((item,index) => {
      item.platformCategoryAttributeValues.map((item1,index1) => {
        if(item1.attrValueName == valueName ){
          this.attrValueId = item1.attrValueId
        }
      })
    })
  }
  //得到SKU信息
  getSkuPicture(){
    if(this.itemSkuVoList !==null&&this.itemSkuVoList.length > 0){
      this.makeInitialSourceData(this.itemSkuVoList.length);
      this.itemSkuVoList.map((item,index) => {
        this.attrValueName = [];
        this.attrKeys = [];
        let firstarr = item.attributes.split(';');
         firstarr.map((item1,index1) => {
           let secondarr = item1.split(':');
           this.getSkuValueName(secondarr[1]);
           this.getSkuAttrName(secondarr[0])
         })
        this.columnsKeys = this.attrKeys;
        console.log(this.columnsKeys);
        this.changeColumnsKeys = JSON.parse(JSON.stringify(this.columnsKeys));

        //构造Table中的行dataSource
        this.dataSource[index].key = index;
        this.attrValueName.map((item2,index2) => {
           this.dataSource[index][this.attrKeys[index2]]= item2;
         });
        this.dataSource[index].oncallbackchirld = this.oncallbackchirld.bind(this);
        this.dataSource[index].pics = this.initialArr[index]?this.initialArr[index]:[{alt:"",url:""}];
      });

      //构造Table中的列dataColumns
      this.makeInitialColumns(this.columnsKeys.length);
      this.columnsKeys.map((item3,index3) => {
        this.dataColumns[index3].key = item3;
        this.dataColumns[index3].dataIndex = item3;
        this.dataColumns[index3].render = text =>(
           <div>{text instanceof Array?text.map(item4=><p>{item4}</p>):text} </div>
        )
      });
      //图片插件所在列
      this.dataColumns.push({
        key: 'action',
        render: (text, record) => (
          <GoodsPic oncallbackchirld={record.oncallbackchirld} record={record} key={record.key} ></GoodsPic>
        )
      })
    }
  }
  /*
  * 改变table中属性的位置
  * */
  onChangePosition (num) {
    let cutCol = this.dataColumns.splice(num,1);
    this.dataColumns.unshift(cutCol[0]);
    let cutKeys = this.changeColumnsKeys.splice(num,1);
    this.changeColumnsKeys.unshift(cutKeys[0])
  }
  /*
   * 不同Tab插入的内容不同
   * */
  handlefilter(numIndex){
    this.targetNum = this.allAttrName[numIndex];
    if(this.staticSource !==null&&this.staticSource.length > 0){
      let volAttr = [];
      let exceptVol = this.columnsKeys.filter(value =>value !== this.allAttrName[numIndex]);

      //除选中的属性外其他的属性
      let someVolAttr = [];
      for(let i=0;i<exceptVol.length;i++){
        someVolAttr.push([])
      }
      this.staticSource.map((item,index) => {
        volAttr.push(item[this.allAttrName[numIndex]]);
      });
      let volArr  = [...new Set(volAttr)];  //数组去重
      volAttr = [];
      console.log(volArr)
      this.makeInitialSourceData(volArr.length);
      this.makeInitialSetPics(volArr.length);
      volArr.map((item2,index2) => {
        this.staticSource.map((item,index) => {
          if(item[this.allAttrName[numIndex]] === item2&&exceptVol !==[] &&exceptVol.length>0){
            exceptVol.map((item3,index3) => {
              someVolAttr[index3].push(item[item3])
            })
            this.setPics[index2].push(index);
          }
        });
        this.setPics[index2].map((item5,index5) => {
          let tran = this.initialArr[item5]?this.initialArr[item5]:[{alt:"",url:""}]
          this.actionPic = this.actionPic.concat(tran)
        })
        this.actionPic = this.actionPic.filter(item6 => item6.url !=="")
        this.actionPic.unshift({alt:'',url:''})
        console.log(this.actionPic)
        console.log(this.initialArr)
        /*
         * 重新构造Table中的数据源dataSource
         * */
        this.dataSource[index2].key = index2;
        someVolAttr.map((item4,index4) => {
          item4 = [...new Set(item4)];
          this.dataSource[index2][exceptVol[index4]] = item4;
        });
        this.dataSource[index2][this.allAttrName[numIndex]] = item2;
        this.dataSource[index2].oncallbackchirld = this.oncallbackchirld.bind(this);
        this.dataSource[index2].pics = JSON.parse(JSON.stringify(this.actionPic));
        //每次清空传给每行图片的数据
        this.actionPic = [];
      });
      console.log(this.dataSource)
      console.log(volArr);
    }
  }
  /*
   * 不同的Tab上传有不同的形式
   * */
  handleUpload(attr,record,picChirldDate,status){
    this.staticSource.map((item5,index5) => {
        if(item5[attr] == record[attr]&&status == 1){
              this.initialArr[index5].push(picChirldDate[picChirldDate.length-1])
        }else{}
        if(item5[attr] == record[attr]&&status == 2){
             if(picChirldDate == [] ||(picChirldDate.length>0&&picChirldDate[0].url == "")){
                  picChirldDate.shift()
              }
              this.initialArr.splice(index5,1,picChirldDate);
        }else{}
        if(item5[attr] == record[attr]&&status == 3){
              if(picChirldDate == [] ||(picChirldDate.length>0&&picChirldDate[0].url == "")){
                  picChirldDate.shift()
              }
              this.initialArr.splice(index5,1,picChirldDate);
        }else{}
        if(item5[attr] == record[attr]&&status == 4){
             if(picChirldDate == [] ||(picChirldDate.length>0&&picChirldDate[0].url == "")){
                  picChirldDate.shift()
              }
              this.initialArr.splice(index5,1,picChirldDate);
        }else{}
      })
  }
  /*
   * Tab单选改变触发
   * */
  onChange(e) {
    this.setState({
      value: e.target.value,
    });
    console.log(e.target.value);

    //交换位置
    this.changeColumnsKeys.map((item,index) => {
          if(e.target.value == item){
               this.onChangePosition(index)
          }
    });
    /*
    * 按四种不同属性上传的情况
    * */
    if(e.target.value === this.allAttrName[0]){
      this.handlefilter(0)
    }else if(e.target.value === this.allAttrName[1]){
      this.handlefilter(1)
    }else if(e.target.value === this.allAttrName[2]){
      this.handlefilter(2)
    }else if(e.target.value === this.allAttrName[3]){
      this.handlefilter(3)
    } else if(e.target.value === 0){
      this.targetNum = 0;
      this.dataSource = [];
      this.getSkuPicture();
      console.log(this.dataSource)
    }
  }
  /*
  * 子组件将上传的商品图片的数据传回来的回调
  * */
  oncallbackparent(picParentDate){
    this.picAllDate.itemPictureVoList = [];
    if(picParentDate !==null&&picParentDate.length >0){
        picParentDate.map((item,index) => {
          this.picAllDate.itemPictureVoList.push({
              "platformId":this.platformId,
              "sellerId":-1,
              "shopId":-1,
              "pictureUrl":item.url,
              "sortNumber":index+1,
              "altImages":item.alt
          })
        })
    }

    //更新redux中的商品图片的数据
    this.itemPulishVO.itemPictureVoList = this.picAllDate.itemPictureVoList;
    this.props.uploadPrams(this.itemPulishVO);
    console.log(this.picAllDate);
  }
  /*
   * 子组件将上传的SKU图片的数据传回来的回调
   * */
  oncallbackchirld(picChirldDate,record,status){

    this.picAllDate.itemSkuPictureVoList = [];

    
    console.log(this.initialArr)
    //不同Tab状态传给后台的数据不同
    if(this.targetNum == 0){
      //更新initialArr的数据
      this.initialArr.splice(record.key,1,picChirldDate);
      if(this.initialArr !== null && this.initialArr.length >0){
        this.initialArr.map((item1,index1) => {
             if(item1 !== []&&item1.length>0){
                item1.map((item2,index2) => {
                  item2.url?this.picAllDate.itemSkuPictureVoList.push({
                    'platformId':this.platformId,
                    'sellerId':-1,
                    'shopId':-1,
                    'pictureUrl':item2.url,
                    'sortNumber':item1[0].url?(index2+1):index2,
                    'altImages':item2.alt,
                    'attributes':[this.itemSkuVoList[index1].attributes]
                  }):null
                })
             }else{}
        })
      }else{}
      this.getSkuPicture();
      console.log(this.picAllDate.itemSkuPictureVoList)
    }else if(this.targetNum == this.allAttrName[0]){
      this.getSkuAttrId(this.allAttrName[0]);
      this.makeInitialAttr();
      this.itemSkuVoList.map((item3,index3) => {
          let firstattr = item3.attributes.split(';');
          firstattr.map((item4,index4) => {
              let secondattr = item4.split(':');
               if(this.attrId == secondattr[0]) {
                 let corAttr = [];
                 this.dataSource.map((item,index) => {
                   this.getSkuAttrValueId(item[this.allAttrName[0]])
                   corAttr.push(this.attrValueId);
                 });
                 let corArr  = [...new Set(corAttr)];  //数组去重
                 corArr.map((item2,index2) => {
                     if (secondattr[1] == item2) {
                       this.attributes[index2].push(item3.attributes)
                     }else{}
                 })
               }else{}
          })
      })
      //改变initialArr
      this.handleUpload(this.allAttrName[0],record,picChirldDate,status);
       console.log(this.initialArr)
      if(this.initialArr !== null && this.initialArr.length >0) {
        this.initialArr.map((item1, index1) => {
          if (item1 !== [] && item1.length > 0) {
            item1.map((item2, index2) => {
              item2.url?this.picAllDate.itemSkuPictureVoList.push({
                'platformId': this.platformId,
                'sellerId': -1,
                'shopId': -1,
                'pictureUrl': item2.url,
                'sortNumber': index2+1,
                'altImages': item2.alt,
                'attributes': this.attributes[record.key]
              }):null
            })
          }else{}
        })
      }else {}
     console.log(this.picAllDate.itemSkuPictureVoList)
    }else if(this.targetNum == this.allAttrName[1]){
      this.getSkuAttrId(this.allAttrName[1]);
      this.makeInitialAttr();
      this.itemSkuVoList.map((item3,index3) => {
        let firstattr = item3.attributes.split(';');
        firstattr.map((item4,index4) => {
          let secondattr = item4.split(':');
          if(this.attrId == secondattr[0]) {
            let corAttr = [];
            this.dataSource.map((item,index) => {
              this.getSkuAttrValueId(item[this.allAttrName[1]])
              corAttr.push(this.attrValueId);
            });
            let corArr  = [...new Set(corAttr)];  //数组去重
            corArr.map((item2,index2) => {
              if (secondattr[1] == item2) {
                this.attributes[index2].push(item3.attributes)
              }else{}
            })
          }else{}
        })
      })
      //改变initialArr
      this.handleUpload(this.allAttrName[1],record,picChirldDate,status);

      if(this.initialArr !== null && this.initialArr.length >0) {
        this.initialArr.map((item1, index1) => {
          if (item1 !== [] && item1.length > 0) {
            item1.map((item2, index2) => {
              item2.url?this.picAllDate.itemSkuPictureVoList.push({
                'platformId': this.platformId,
                'sellerId': -1,
                'shopId': -1,
                'pictureUrl': item2.url,
                'sortNumber': index2+1,
                'altImages': item2.alt,
                'attributes': this.attributes[record.key]
              }):null
            })
          }else{}
        })
      }else{}
    }else if(this.targetNum == this.allAttrName[2]){
      this.getSkuAttrId(this.allAttrName[2]);
      this.makeInitialAttr();
      this.itemSkuVoList.map((item3,index3) => {
        let firstattr = item3.attributes.split(';');
        firstattr.map((item4,index4) => {
          let secondattr = item4.split(':');
          if(this.attrId == secondattr[0]) {
            let corAttr = [];
            this.dataSource.map((item,index) => {
              this.getSkuAttrValueId(item[this.allAttrName[2]])
              corAttr.push(this.attrValueId);
            });
            let corArr  = [...new Set(corAttr)];  //数组去重
            corArr.map((item2,index2) => {
              if (secondattr[1] == item2) {
                this.attributes[index2].push(item3.attributes)
              }else{}
            })
          }else{}
        })
      })
      //改变initialArr
      this.handleUpload(this.allAttrName[2],record,picChirldDate,status);

      if(this.initialArr !== null && this.initialArr.length >0) {
        this.initialArr.map((item1, index1) => {
          if (item1 !== [] && item1.length > 0) {
            item1.map((item2, index2) => {
              item2.url?this.picAllDate.itemSkuPictureVoList.push({
                  'platformId': this.platformId,
                  'sellerId': -1,
                  'shopId': -1,
                  'pictureUrl': item2.url,
                  'sortNumber': index2+1,
                  'altImages': item2.alt,
                  'attributes': this.attributes[record.key]
                }):null
            })
          }else{}
        })
      }else{}
    }else if(this.targetNum == this.allAttrName[3]){
      this.getSkuAttrId(this.allAttrName[3]);
      this.makeInitialAttr();
      this.itemSkuVoList.map((item3,index3) => {
        let firstattr = item3.attributes.split(';');
        firstattr.map((item4,index4) => {
          let secondattr = item4.split(':');
          if(this.attrId == secondattr[0]) {
            let corAttr = [];
            this.dataSource.map((item,index) => {
              this.getSkuAttrValueId(item[this.allAttrName[3]])
              corAttr.push(this.attrValueId);
            });
            let corArr  = [...new Set(corAttr)];  //数组去重
            corArr.map((item2,index2) => {
              if (secondattr[1] == item2) {
                this.attributes[index2].push(item3.attributes)
              }else{}
            })
          }else {}
        })
      })
       //改变initialArr
      this.handleUpload(this.allAttrName[3],record,picChirldDate,status);
      
      if(this.initialArr !== null && this.initialArr.length >0) {
        this.initialArr.map((item1, index1) => {
          if (item1 !== [] && item1.length > 0) {
            item1.map((item2, index2) => {
              item2.url?this.picAllDate.itemSkuPictureVoList.push({
                  'platformId': this.platformId,
                  'sellerId': -1,
                  'shopId': -1,
                  'pictureUrl': item2.url,
                  'sortNumber': index2+1,
                  'altImages': item2.alt,
                  'attributes': this.attributes[record.key]
                }):null
            })
          }else {}
        })
      }
    }

     /*
     *去除重复的图片
     */
     let arr = this.picAllDate.itemSkuPictureVoList;
     let datas = [];
     let resultValue = [];
     for(let i = 0; i < arr.length; i ++){
         let off = true;
         for(let j = 0; j < datas.length; j ++){
             if(arr[i].pictureUrl === datas[j][0].pictureUrl){
                     off = false;
                     break;
             }
         }
         if(!off){
            continue;
         }
         let data = arr.filter((item, index, arr) => item.pictureUrl === arr[i].pictureUrl);
         datas.push(data);
     }
     datas.map(item=>{
         resultValue.push(item[0]);
     })
     this.itemPulishVO.itemSkuPictureVoList = resultValue;
     this.props.uploadPrams(this.itemPulishVO);
     console.log(resultValue);
  }
  /*
  *从redux中得到初始数据
  * */
  handleInit(){
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    this.itemSkuVoList = this.itemPulishVO.itemSkuVoList;
    this.saleData = this.props.goodsRlease.saleData;
    this.picAllDate.itemSkuPictureVoList = this.itemPulishVO.itemSkuPictureVoList
    this.picAllDate.itemPictureVoList = this.itemPulishVO.itemPictureVoList
    this.makeInitialSourceData(this.itemSkuVoList.length)
    this.getSkuPicture();
  }
  render() {
    
    console.log(this.dataSource)
    return (
              <div className="ui-container">
                <div className="ui-breadcrumb">
                  <span className={styles.required}>*</span>
                  <strong className={styles.picturesku}>商品图片</strong>
                  <span>（至少添加一张，最多允许十张；单张图片不能大于5M；允许的图片格式有jpg、jpeg、png、JPG、JPEG、PNG）</span>
                </div>
                <div className="ui-ct">
                  <div className="ui-bd clearfix">
                    <GoodsPic oncallbackparent={this.oncallbackparent.bind(this)} initialParent={this.initialParent}></GoodsPic>
                  </div>
                </div>
                <div className="ui-breadcrumb">
                  <strong className={styles.picturesku}>SKU图片</strong>
                  {this.itemSkuVoList.length > 0 &&
                    (<RadioGroup onChange={::this.onChange} value={this.state.value} defaultValue={this.state.value}>
                        <Radio value={0}>分别上传</Radio>
                         {!this.props.editGoods&&this.columnsKeys.length >0&&this.columnsKeys.map( (item,index) =>{
                              return( <Radio value={item} key={index}>按商品{item}属性上传</Radio>)
                           })
                         }
                      </RadioGroup>)}
                  {this.itemSkuVoList.length > 0 &&
                     (<div className="ui-ct">
                        <div className="ui-bd clearfix">
                          <Table dataSource={this.dataSource} columns={this.dataColumns} showHeader={false}/>
                        </div>
                      </div>)}
                </div>
              </div>);

  }
}