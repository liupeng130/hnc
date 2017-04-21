/****************************************************************
 * author:FengYan
 * date:2017-02-13
 * update:2017-02-19
 * description:brand edit
 ****************************************************************/
import React, {Component} from 'react';
import {Table, Modal, Row, Col, Input, Button, Form, Pagination} from 'jcloudui';
const FormItem = Form.Item;

/*********  自定义组件调用  *********/
import BaseComponent from '../../../Common/BaseComponent';
import styles from '../style/BrandList.less';    //css style
import {GetAllCategory, BrandUp} from 'components';

class BrandSave extends BaseComponent {
  constructor(props) {
    super(props);
    this.tableColumns = [{
      title: '一级类目',
      dataIndex: 'firstLevName',
      width: '20%'
    }, {
      title: '二级类目',
      dataIndex: 'secondLevName',
      width: '20%'
    }, {
      title: '三级类目',
      dataIndex: 'thirdLevName',
      width: '20%'
    }, {
      title: '四级类目',
      dataIndex: 'fourthLevName',
      width: '20%'
    }, {
      title: '操作',
      dataIndex: 'action',
      width: '20%',
      render: (text, record, index) => <a onClick={()=>this.removeTableList(index)}>取消关联</a>
    }];
    this.state = {
      imgurl: '',
      tableList: false,
      cids: false
    };
  }
  
  removeTableList(index) {
    //移除类目
    this.flag = false;
    this.state.tableList.splice(index, 1);
    this.state.cids.splice(index, 1);
    this.setState({
      tableList: this.state.tableList,
      cids: this.state.cids
    });
  }
  
  imgurl(url) {
    //图片回调
    this.setState({
      imgurl: url
    })
  }
  
  tableList(list, cids) {
    //关联回调
    this.setState({
      tableList: list,
      cids: cids
    });
  }
  
  autoCategory() {
    //修改状态数据回填
    let catetoryName = [], cid = [];
    this.props.detail.categoryList.map((category)=> {
      catetoryName.push({
        firstLevName: category.firstLevName,
        secondLevName: category.secondLevName,
        thirdLevName: category.thirdLevName,
        fourthLevName: category.fourthLevName,
      });
      let ccid = '';
      if (category.fourthLevCid) {
        ccid = category.fourthLevCid;
      } else if (category.thirdLevCid) {
        ccid = category.thirdLevCid;
      } else if (category.secondLevCid) {
        ccid = category.secondLevCid;
      } else {
        ccid = category.firstLevCid;
      }
      cid.push({
        cid: ccid
      })
    });
    this.setState({
      tableList: catetoryName,
      cids: cid
    });
  }
  
  componentWillMount() {
    //更新编辑category数据
    setTimeout(()=> {
      this.autoCategory();
    }, 300)
  }
  
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const {brandNameCh, brandNameEn, telePhone, brandUrl, remark, id, brandLogoUrl, platformId} = this.props.detail.brand;
    return (
      <Form>
        { getFieldDecorator('id', {initialValue: id})}
        { getFieldDecorator('platformId', {initialValue: platformId})}
        { getFieldDecorator('categoryList', {initialValue: JSON.stringify(this.state.cids)})}
        <Row>
          <Col span={12}>
            <Row className={styles.brandInformation}>
              <Row>
                <Col><strong>品牌信息</strong></Col>
              </Row>
              <FormItem
                {...formItemLayout}
                label="品牌中文名："
                hasFeedback
              >
                {getFieldDecorator('brandNameCh', {
                  rules: [{
                    required: true, message: '品牌中文名不能为空！'
                  }, {
                    validator: 'brandNameCh',
                  }, {
                    pattern: /[\u4E00-\u9FA5]$/, message: '请输入品牌中文名！'
                  }],
                  initialValue: brandNameCh,
                  
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="品牌英文名："
                hasFeedback
              >
                {getFieldDecorator('brandNameEn', {
                  rules: [{
                    required: true, message: '品牌英文名不能为空！'
                  }, {
                    validator: 'brandNameEn',
                  }, {
                    pattern: /^[\w\s]+$/, message: '请输入品牌英文名！',
                  }],
                  initialValue: brandNameEn
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="网址："
                hasFeedback
              >
                {getFieldDecorator('brandUrl', {
                  rules: [{
                    validator: 'brandUrl',
                  }],
                  initialValue: brandUrl
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="服务电话："
                hasFeedback
              >
                {getFieldDecorator('telePhone', {
                  rules: [{
                    validator: 'telePhone',
                  }],
                  initialValue: telePhone
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                label="品牌LOGO："
              >
                {getFieldDecorator('brandLogoUrl', {
                  initialValue: this.state.imgurl || brandLogoUrl
                })}
                <BrandUp imgurl={this.imgurl.bind(this)} imgsrc={brandLogoUrl}/>
                支持小于长120px高60px的JPG、PNG格式图片
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="备注："
              >
                {getFieldDecorator('remark', {
                  rules: [{
                    validator: 'remark',
                  }],
                  initialValue: remark
                })(
                  <Input />
                )}
              </FormItem>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col><strong>类目信息</strong></Col>
            </Row>
            <Row>
              <GetAllCategory tableList={this.tableList.bind(this)}/>
            </Row>
            <Table
              columns={ this.tableColumns }
              dataSource={this.state.tableList}
              pagination={false}
              scroll={{y: 300}}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(BrandSave);
