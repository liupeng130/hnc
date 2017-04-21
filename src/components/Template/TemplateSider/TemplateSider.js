import React, {Component} from 'react';
import { Layout, Menu, Icon} from 'jcloudui';

import {Link} from 'react-router';	//链接跳转，相当于a标签
import styles from  './style/templateSider.less';

export default class TemplateSider extends Component {

  constructor(context) {
    super(context);
    this.state = {
      current: '1',
    };
  }
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    const SubMenu = Menu.SubMenu;
    return (
      <div>
        <div className={styles.logo}>
          <a href="javascript:;"><img src="http://b2b.jcloud.jd.com.c-bj.jcloud.com/fe535634-3b55-48ba-8cf5-93fa72859bbe.png" width="148" height="44"/></a>
        </div>
        <Menu
          theme="dark"
          onClick={::this.handleClick}
          style={{ width: 200 }}
          // defaultOpenKeys={['sub6']}
          selectedKeys={[this.state.current]}
          className={styles.menu}
          mode="inline"
        >
          <Menu.Item key="1"><Link to="/brand"><Icon type="pp" />品牌管理</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/Specifications"><Icon type="ggcs" />规格参数管理</Link></Menu.Item>
          <Menu.Item key="3"><Icon type="fl" />类目管理</Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="cgs" /><span>采购商管理</span></span>}>
            <Menu.Item key="4">采购商管理</Menu.Item>
            <Menu.Item key="5">信息变更审核</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="gys" /><span>供应商管理</span></span>}>
            <Menu.Item key="6">入驻审核</Menu.Item>
            <Menu.Item key="7">合同管理</Menu.Item>
            <Menu.Item key="8">返点管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="xx" /><span>信息管理</span></span>}>
            <Menu.Item key="9">信息变更审核</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }

}