import React, {Component} from 'react';
import { Row, Col, Form, Input, Button, Radio, Select,Table,Icon } from 'jcloudui';

const columns = [{
  title: '品牌名称',
  dataIndex: 'brandName',
  key: 'brandName'
}, {
  title: '品牌LOGO',
  dataIndex: 'brandLogo',
  key: 'brandLogo',
}, {
  title: '网址',
  dataIndex: 'brandUrl',
  key: 'brandUrl',
  render: text => <a href="#">{text}</a>,
}, {
  title: '服务电话',
  dataIndex: 'serviceCall',
  key: 'serviceCall',
}, {
  title: '备注',
  dataIndex: 'remarks',
  key: 'remarks',
}, {
  title: '审核状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">查看</a>
      <span className="ant-divider"/>
      <a href="#">编辑</a>
      <span className="ant-divider"/>
       <a href="#">停用</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  brandName: '海尔',
  brandLogo: <span className="brand-br"><img src="http://storage.jd.com/b2b.jcloud.jd.com/8b26b3d2-73c5-4301-b5ee-5e61497b8c3c.jpg" width="102" height="57"/></span>,
  brandUrl: 'www.intel.com',
  serviceCall: '400123456',
  remarks: '英特尔中国（芯片）',
  status: '有效',
}, {
  key: '2',
  brandName: '海尔',
  brandLogo: <span className="brand-br"><img src="http://storage.jd.com/b2b.jcloud.jd.com/4ec2e3ef-7be0-42bf-b892-49ea994de4d7.jpg" width="102" height="57"/></span>,
  brandUrl: 'www.intel.com',
  serviceCall: '400123456',
  remarks: '英特尔中国（芯片）',
  status: '有效',
}, {
  key: '3',
  brandName: '海尔',
  brandLogo: <span className="brand-br"><img src="http://storage.jd.com/b2b.jcloud.jd.com/8b26b3d2-73c5-4301-b5ee-5e61497b8c3c.jpg" width="102" height="57"/></span>,
  brandUrl: 'www.intel.com',
  serviceCall: '400123456',
  remarks: '英特尔中国（芯片）',
  status: '有效',
}, {
  key: '4',
  brandName: '海尔',
  brandLogo: <span className="brand-br"><img src="http://storage.jd.com/b2b.jcloud.jd.com/8b26b3d2-73c5-4301-b5ee-5e61497b8c3c.jpg" width="102" height="57"/></span>,
  brandUrl: 'www.intel.com',
  serviceCall: '400123456',
  remarks: '英特尔中国（芯片）',
  status: '有效',
}, {
  key: '5',
  brandName: '海尔',
  brandLogo: <span className="brand-br"><img src="http://storage.jd.com/b2b.jcloud.jd.com/8b26b3d2-73c5-4301-b5ee-5e61497b8c3c.jpg" width="102" height="57"/></span>,
  brandUrl: 'www.intel.com',
  serviceCall: '400123456',
  remarks: '英特尔中国（芯片）',
  status: '有效',
}, {
  key: '6',
  brandName: '海尔',
  brandLogo: <span className="brand-br"><img src="http://storage.jd.com/b2b.jcloud.jd.com/8b26b3d2-73c5-4301-b5ee-5e61497b8c3c.jpg" width="102" height="57"/></span>,
  brandUrl: 'www.intel.com',
  serviceCall: '400123456',
  remarks: '英特尔中国（芯片）',
  status: '有效',
}];
export default class Results extends Component {

  render() {
    return (
      <div>
        <div className="tbl-top-action">
          <Button type="primary" icon="plus">添加新品牌</Button>
          <Button type="ghost" style={{marginLeft:10}}>批量上传</Button>
        </div>
        <div className="ui-tbl">
          <Table columns={columns} dataSource={data} size="middle"/>
        </div>
      </div>
    )
  }

}