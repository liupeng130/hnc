/*
* author:FengYan
* date:2017-01-22
* description:brand body
*/
import React, {Component} from 'react';
import {BrandUpload} from 'components';
import { Breadcrumb } from 'jcloudui';
import styles from './style/Brand.less';
import {Link} from 'react-router';

class Brand extends Component {
  render() {
    return (
        <div id={styles.brandContainer}>
          <div className={styles.breadWrap}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="brand">品牌管理</Link></Breadcrumb.Item>
              <Breadcrumb.Item>批量上传</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.title}>批量上传</div>
            <BrandUpload />
          </div>
        </div>
      );
  }
}
export default Brand;
