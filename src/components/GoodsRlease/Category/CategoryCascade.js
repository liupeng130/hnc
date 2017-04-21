/*

 * author:LiuYang
 * date:2017-03<span style = {{color: '#ccc'}}>请选择</span>5
 * description:按照提出的新需要改成默认显示四列并且加上回显功能

 */
import React from 'react';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFirstCid,getSecondCid,getThirdCid,getFourCid,clearData} from './redux';

const Option = Select.Option;
const defaultValue = '请选择';
const listTip = '请选择类目';
const allowClear = true;

@connect(
  state => ({categoryCascade:state.categoryCascade}),
  dispatch => bindActionCreators({getFirstCid,getSecondCid,getThirdCid,getFourCid,clearData}, dispatch)
)
export default class CategoryCascade extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.state={
      newcategory: [],
      second: false,
      third: false,
      four: false,
      first: false,
      firstValue: <span style = {{color: '#ccc'}}>请选择</span>,
      secondValue: <span style = {{color: '#ccc'}}>请选择</span>,
      thirdValue: <span style = {{color: '#ccc'}}>请选择</span>,
      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
    };
    this.handleFirstCategoryChange = this.handleFirstCategoryChange.bind(this);
    this.handleSecondCategoryChange = this.handleSecondCategoryChange.bind(this);
    this.handleThirdCategoryChange = this.handleThirdCategoryChange.bind(this);
    this.handleFourCategoryChange = this.handleFourCategoryChange.bind(this);
    this.firstCategoryOptions = [];
    this.secondCategoryOptions = [];
    this.thirdCategoryOptions = [];
    this.fourCategoryOptions = [];
    this.firstCategoryId = {};
    this.secondCategoryId = {};
    this.thirdCategoryId = {};
    this.fourCategoryId = {};
    //是否联动
    this.isShowAllCategory = false;
    this.initFind = true;
    this.newcategory = [];
    this.category = [];
    this.cid = 0;
    this.currentCategory = [];
    this.currentIndex = 0;
  }

  /**
   * 初始化view时，查询平台一级分类
   */
  componentWillMount() {
    console.log(this.props,'this.propsthis.propsthis.propsthis.props');
    this.isShowAllCategory = this.props.isShowAllCategory && this.props.isShowAllCategory;
    let parentCid = -1;
    this.props.getFirstCid(this.platformId,parentCid);
    console.log(this.props,'this.propsthis.propsthis.propsthis.props');
  }

  /**
   * 判断json对象是否为空
   * @param e
   * @returns {boolean}
   */
  isNotEmptyObject(e){
    var t;
    for (t in e)
      return !0;
    return !1
  }

  handleChangeCategoryValue(cid) {
    let {onChangeCategoryValue} = this.props;
    if (this.isNotEmptyObject(this.fourCategoryId)){
      onChangeCategoryValue(this.fourCategoryId.cid);
    }else if(this.isNotEmptyObject(this.thirdCategoryId)){
      onChangeCategoryValue(this.thirdCategoryId.cid);
    }else if(this.isNotEmptyObject(this.secondCategoryId)){
      onChangeCategoryValue(this.secondCategoryId.cid);
    }else if(this.isNotEmptyObject(this.firstCategoryId)){
      onChangeCategoryValue(this.firstCategoryId.cid);
    }else {
      onChangeCategoryValue(cid);
    }
  }
  // author liuyang
  detailIndex(cid, category , index){
    let hasLeaf = false;
    if(category && category.length > 0){
      category.map((item, index) => {
        if(item.cid == cid){
          this.currentIndex = index;
          if(category[this.currentIndex].hasLeaf == 1){
            hasLeaf = true;
          }else{}
        }else{}
      });
    }else{}

    if(+index === 2){
      this.setState({
        second: hasLeaf
      });
    }else if(+index === 3){
      this.setState({
        third: hasLeaf
      });
    }else if(+index === 4){
      this.setState({
        four: hasLeaf
      });
    }else{
      this.setState({
        first: hasLeaf
      });
    }
  }
  // author liuyang
  /**
   * 获取四级类目cid，返回组件对外提供的方法上面，供父组件使用
   * @param cid
   */
  handleFourCategoryChange(cid) {
    this.setState({
      fourValue: cid
    });
    if (cid){
      this.fourCategoryId = {cid:cid};
    }else{
      this.fourCategoryId = {};
    }
    this.handleChangeCategoryValue(cid);
    this.detailIndex(cid, this.props.categoryCascade.four.data.data, 4);
  }

  /**
   * 查询四级类目
   * @param cid
   */
  handleThirdCategoryChange(cid) {
    this.setState({
      thirdValue: cid,
      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
      four: false,
    });
    if (cid){
      this.thirdCategoryId = {cid:cid};
      this.props.getFourCid(this.platformId,cid);
    }else {
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.fourCategoryOptions = [];
      this.props.clearData(3);
    }
    this.handleChangeCategoryValue(cid);
    this.detailIndex(cid, this.props.categoryCascade.third.data.data, 3);
  }

  /**
   * 查询三级类目
   * @param cid
   */
  handleSecondCategoryChange(cid) {
    this.setState({
      secondValue: cid,
      thirdValue: <span style = {{color: '#ccc'}}>请选择</span>,
      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
      third: false,
      four: false,
    });
    if (cid){
      this.secondCategoryId = {cid:cid};
      this.props.getThirdCid(this.platformId,cid);
    }else{
      this.secondCategoryId = {};
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.thirdCategoryOptions = [];
      this.fourCategoryOptions = [];
      this.props.clearData(2);
    }
    this.handleChangeCategoryValue(cid);
    this.detailIndex(cid, this.props.categoryCascade.second.data.data, 2);
  }
  /**
   * 查询二级类目
   * @param cid
   */
  handleFirstCategoryChange(cid) {
    this.setState({
      firstValue: cid,
      secondValue: <span style = {{color: '#ccc'}}>请选择</span>,
      thirdValue: <span style = {{color: '#ccc'}}>请选择</span>,
      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
      second: false,
      third: false,
      four: false,
    });
    if (cid) {
      this.firstCategoryId = {cid:cid};
      this.props.getSecondCid(this.platformId,cid);
    } else{
      this.firstCategoryId = {};
      this.secondCategoryId = {};
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.secondCategoryOptions = [];
      this.thirdCategoryOptions = [];
      this.fourCategoryOptions = [];
      this.props.clearData(1);
    }
    this.handleChangeCategoryValue(cid);
    this.detailIndex(cid, this.props.categoryCascade.first.data.data, 1);
  }

  dataSource() {
    return {
      first:()=>{
        if (this.props.categoryCascade.first.data){
          let firstResult = this.props.categoryCascade.first.data.data;
          if (firstResult && firstResult.length > 0){
            this.firstCategoryOptions = firstResult.map(first => <Option key={first.cid}>{first.categoryName}</Option>);
          }
        }
      },
      second:()=>{
        if (this.props.categoryCascade.second.data){
          let secondResult = this.props.categoryCascade.second.data.data;
          if (secondResult && secondResult.length > 0){
            this.secondCategoryOptions = secondResult.map(second => <Option key={second.cid}>{second.categoryName}</Option>);
          }
        }
      },
      third:()=>{
        if (this.props.categoryCascade.third.data){
          let thirdResult = this.props.categoryCascade.third.data.data;
          if (thirdResult && thirdResult.length > 0){
            this.thirdCategoryOptions = thirdResult.map(third => <Option key={third.cid}>{third.categoryName}</Option>);
          }
        }
      },
      four:()=>{
        if (this.props.categoryCascade.four.data){
          let fourResult = this.props.categoryCascade.four.data.data;
          if (fourResult && fourResult.length > 0){
            this.fourCategoryOptions = fourResult.map(four => <Option key={four.cid}>{four.categoryName}</Option>);
          }
        }
      }
    }
  }
  render() {
    this.props.categoryCascade.first.loaded && this.dataSource().first();
    this.props.categoryCascade.second.loaded && this.dataSource().second();
    this.props.categoryCascade.third.loaded && this.dataSource().third();
    this.props.categoryCascade.four.loaded && this.dataSource().four();
    if(this.props.categoryData != null){
      if(this.initFind){
        this.category = this.props.categoryData.split(',');
        this.newcategory = [];
        this.category.map((item,index) => {
          if(item != null && item != "null"){
            this.newcategory.push(item);
          }else{}
        });
        this.setState({
          newcategory: this.newcategory
        });   
        this.initFind =  false;
      }else{}
    }else{}
    //信息回显end  author liuyang
     return (
        <div>
          {this.props.categoryEdit && this.state.newcategory.length > 0 && <Select placeholder={defaultValue}   defaultValue = {this.state.newcategory[0]&&this.state.newcategory[0]} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 ,marginRight:10}} onChange={this.handleFirstCategoryChange}>
                      {this.firstCategoryOptions}
                    </Select>}
          {!this.props.categoryEdit && <Select  value = {this.state.firstValue} placeholder={defaultValue} notFoundContent={listTip} allowClear={true} size="large" style={{ width: 120,marginRight:10 }} onChange={this.handleFirstCategoryChange}>
                      {this.firstCategoryOptions}
                    </Select>}
          {this.props.categoryEdit && this.state.newcategory.length >= 1 && <Select disabled = {this.state.first} placeholder={defaultValue}   defaultValue = {this.state.newcategory[1]&&this.state.newcategory[1]} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 ,marginRight:10}} onChange={this.handleSecondCategoryChange}>
                      {this.secondCategoryOptions}
                    </Select>}
          {!this.props.categoryEdit && <Select value = {this.state.secondValue} disabled = {this.state.first} placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginRight:10 }} onChange={this.handleSecondCategoryChange}>
                      {this.secondCategoryOptions}
                    </Select>}
          {this.props.categoryEdit && this.state.newcategory.length >= 2 && <Select disabled = {this.state.second || this.state.first} placeholder={defaultValue}   defaultValue = {this.state.newcategory[2]&&this.state.newcategory[2]} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 ,marginRight:10}} onChange={this.handleThirdCategoryChange}>
                      {this.thirdCategoryOptions}
                    </Select>}
          {!this.props.categoryEdit && <Select value = {this.state.thirdValue} disabled = {this.state.second || this.state.first} placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginRight:10 }} onChange={this.handleThirdCategoryChange}>
                      {this.thirdCategoryOptions}
                    </Select>}
          {this.props.categoryEdit && this.state.newcategory.length >= 3 && <Select disabled = {this.state.first || this.state.second || this.state.third } placeholder={defaultValue}    defaultValue = {this.state.newcategory[3]&&this.state.newcategory[3]} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 ,marginRight:10}} onChange={this.handleFourCategoryChange}>
                      {this.fourCategoryOptions}
                    </Select>}
          {!this.props.categoryEdit && <Select value = {this.state.fourValue} disabled = {this.state.first||this.state.second || this.state.third }  placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginRight:10 }} onChange={this.handleFourCategoryChange}>
                      {this.fourCategoryOptions}
                    </Select>}
        </div>
      );
  }
}
