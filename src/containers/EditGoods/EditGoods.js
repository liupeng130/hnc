/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布
 ****************************************************************/
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {Link} from 'react-router';  //链接跳转，相当于a标签
import { editGoodsInfo } from './redux';
import GoodsRlease from '../GoodsRlease/GoodsRlease';
import {getSaleInfo, getBrandInfo, findCategory} from 'components/GoodsRlease/redux';
@connect(
  state => ({
    goodsEdit: state.goodsEdit,
    goodsRlease: state.goodsRlease,
  }),
 dispatch => bindActionCreators({getSaleInfo, getBrandInfo, editGoodsInfo, findCategory}, dispatch)
)
export default class EditGoods extends Component{
  constructor(props, context) {
    super(props, context);
    this.location = '';

  }
 componentWillMount(){
  this.location = typeof window !== 'undefined' ? window.location.href : "";
  let itemId =  this.getUrlParam(this.location, 'itemId');
  let param = {
    platformId: 2,
    itemId: itemId
  }

  this.props.editGoodsInfo(param).then(
          (result)=>{
             let param2 = {
              platformId: 2,
              cid: this.props.goodsEdit.editGoods.cid,
              }
            this.props.getSaleInfo(param2);
            this.props.getBrandInfo(param2);
            this.props.findCategory(param2);
          },
          (error)=>{}
  );
  }
  getUrlParam(url, name) {
        var pattern = new RegExp('[?&]' + name + '\=([^&]+)', 'g');
        var matcher = pattern.exec(url);
        var items = null;
        if (matcher !== null) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            }
            catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                }
                catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    }
  render() {
    const editData = this.props.goodsEdit.editGoods;
    console.log(editData)
    return (
      <div>
        <GoodsRlease editGoods = {true} editData = {editData}></GoodsRlease>
      </div>
    );
  }
}