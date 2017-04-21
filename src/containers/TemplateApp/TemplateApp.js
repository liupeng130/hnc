import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { Layout, Menu, Icon, Switch, Dropdown} from 'jcloudui';
import {Link} from 'react-router';	//链接跳转，相当于a标签
const { Header, Content, Footer, Sider } = Layout;
import {TemplateSider,TemplateHeader} from 'components';

@asyncConnect([{
  promise: ({store: {}}) => {
    const promises = [];
    return Promise.all(promises);
  }
}])
export default class App extends Component {

  render() {
    return (
      <Layout>
        <Sider style={{background:'#333746'}}>
          <TemplateSider />
        </Sider>
        <Layout style={{background:"#fff"}}>
          <Header style={{ background:'transparent', height:'auto', padding:'0',}}>
            <TemplateHeader />
          </Header>
          <Content style={{width:'100%'}}>
            {this.props.children}
          </Content>
          <Footer style={{backgroundColor:'#f4f4f4'}}>
            footer
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
