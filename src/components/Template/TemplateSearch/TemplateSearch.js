import React, {Component} from 'react';
import { Row, Col, Form, Input, Button, Radio, Select } from 'jcloudui';
const FormItem = Form.Item;
const Option = Select.Option;

export default class TemplateSearch extends Component {

  render() {
    return (
      <div className="ui-search">
        <Row>
          <Col span={24} className="l-content">
            <Form inline>
              <FormItem label="平台分类：">
                <div>
                  <Select size="large" defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="yiminghe">Yiminghe</Option>
                  </Select>
                  <Select size="large" defaultValue="lucy" style={{ width: 120,marginLeft:10 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select size="large" defaultValue="lucy" style={{ width: 120,marginLeft:10 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select size="large" defaultValue="lucy" style={{ width: 120,marginLeft:10 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </div>
              </FormItem>
              <FormItem label="状态：">
                <Input placeholder="input placeholder"/>
              </FormItem>
              <FormItem label="品牌中文名：">
                <Input placeholder="input placeholder"/>
              </FormItem>
              <FormItem label="品牌英文名：">
                <Input placeholder="input placeholder"/>
              </FormItem>
              <FormItem label="服务电话：">
                <Input placeholder="input placeholder"/>
              </FormItem>
              <FormItem label="网址：">
                <Input placeholder="input placeholder"/>
              </FormItem>

              <div className="r-action">
                <Button type="primary" size="large" icon="search" >查 询</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}