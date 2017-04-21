import React, {Component} from 'react';
import { Badge,Icon,Menu,Dropdown } from 'jcloudui';
import  './style/templateHader.css';

export default class TemplateHeader extends Component {

  render() {

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
        </Menu.Item>
      </Menu>
    );

    return (

      <div className="ui-header">
        <h2>运营后台</h2>
        <div className="userInfo">
          {/* cont>99添加className="mBadge" */}
          <Badge count={23} className="ui-badge" overflowCount={99}>
            <a href="">消息</a>
          </Badge>
          <Dropdown overlay={menu} >
            <a className="ant-dropdown-link" href="#">
              婷婷李 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '63px',borderBottom:'0', float: 'right',marginRight:'10px',fontSize:'14px'}}
        >
          <Menu.Item key="13">首页</Menu.Item>
          <Menu.Item key="14">用户管理</Menu.Item>
          <Menu.Item key="15">商品管理</Menu.Item>
          <Menu.Item key="16">订单管理</Menu.Item>
        </Menu>
      </div>
    )
  }
}