import React, {Component} from 'react';
// import { Input } from 'jcloudui';
import { Layout, Breadcrumb } from 'jcloudui';
const { Content } = Layout;
// const styles = require('./style/test.less');

export default class Testchildren extends Component {
  handleSubmit() {

  }
  render() {
    return (
      <Layout className="layout">
        <Content >
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>规格参数管理</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', minHeight: 80 }}>规添加新属性格参数管理</div>
          <div style={{ background: '#fff', minHeight: 100 }}>
            添加新属性
            复制到
          </div>
          <div style={{ background: '#fff', minHeight: 280 }}>属性表格</div>
        </Content>
      </Layout>
    );
  }
}
