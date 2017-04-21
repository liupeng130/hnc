/****************************************************************
 * author:FengYan
 * date:2017-02-16
 * description:Brand
 ****************************************************************/
import React, { Component } from 'react';
import { BrandListWrapper, BrandSearch } from 'components'
import styles from './style/Brand.less';
import { Breadcrumb, Button } from 'jcloudui';
import { Link } from 'react-router';

/* 自定义组件调用 */
import { connect } from 'react-redux';
import { brandSearch } from '../../components/Brand/BrandSearch/redux';
@connect(
  state => ({ viewBrandList:state.brandSearch }),
)
class Brand extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      brandSearch : this
    };
  }
  childComponentCallback(_this){
    this.setState({
      brandSearch : _this
    });
  }
  refreshView() {
    this.state.brandSearch.resetSubmit();
  }
  render() {
    return (
        <div id={styles.brandContainer}>
          <div className={styles.breadWrap}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>品牌管理</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.title}>品牌管理</div>
            <div className={styles.searchWrap}>
              <BrandSearch childComponentCallback = {this.childComponentCallback.bind(this)}/>
            </div>
            <BrandListWrapper />
          </div>
        </div>
      );
  }
}
export default Brand;
