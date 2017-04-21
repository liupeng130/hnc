import React, {Component} from 'react';
import {BrandUpload} from 'components';
import { Breadcrumb,Tabs,Button,Modal,Table,Upload,message} from 'jcloudui';
import styles from './style/BatchUpload.less';
const TabPane = Tabs.TabPane;
const columns = [{
  title: '分类名称',
  dataIndex: 'name',
  width: 150,
}, {
  title: '父级分类ID',
  dataIndex: 'parentSortId',
  width: 150,
}, {
  title: '失败原因',
  dataIndex: 'cause',
}];
const data = [];
for (let num = 0; num < 30; num++) {
  data.push({
    name: `手机 ${num}`,
    parentSortId: `id ${num}`,
    cause: `失败原因 ${num}`,
  });
}
const uploadProps = {
  name: 'file',
  action: '/upload.do',
  headers: {
    authorization: 'authorization-text',
  },
  showUploadList:false
};
export default class BatchUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false};
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.callback = this.callback.bind(this);
    this.uploadChange =this.uploadChange.bind(this);
  }
  getInitialState() {
    return { visible: false };
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleCancel(envent) {
    console.log(envent);
    this.setState({
      visible: false,
    });
  }
  handleOk() {
    console.log('click ok');
    this.setState({
      visible: false,
    });
  }
  callback(key) {
    console.log(key);
  }
  uploadChange(info){
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      //message.success(`${info.file.name} file uploaded successfully`);
      this.showModal();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  render() {
    return(
    <div className="ui-container">
      <div className="ui-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item><a href="brand">品牌管理</a></Breadcrumb.Item>
          <Breadcrumb.Item>批量上传</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="ui-ct">
        <div className="ui-hd">品牌管理</div>
        <div className="ui-bd">
          <div style={{marginTop:'20px'}}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="上传分类" key="1">
                <div className={styles.downloadTempPanel}>
                  <span className={styles.textTitle}>批量分类导入模板下载&nbsp;</span>
                  <Button type="primary">下载模板</Button>
                </div>
                <div className={styles.uploadTempPanel}>
                  <span className={styles.textTitle}>将填写好的模板上传，每个模板最多支持1000行&nbsp;</span>
                  <Upload {...uploadProps} onChange={(info)=>this.uploadChange(info)}>
                    <Button type="primary">点我上传</Button>
                  </Upload>
                </div>
              </TabPane>
              <TabPane tab="上传品牌" key="2">
                <div className={styles.downloadTempPanel}>
                  <span className={styles.textTitle}>批量品牌导入模板下载&nbsp;</span>
                  <Button type="primary">下载模板</Button>
                </div>
                <div className={styles.uploadTempPanel}>
                  <span className={styles.textTitle}>将填写好的模板上传，每个模板最多支持1000行&nbsp;</span>
                  <Upload {...uploadProps} onChange={(info)=>this.uploadChange(info)}>
                    <Button type="primary">点我上传</Button>
                  </Upload>
                </div>
              </TabPane>
            </Tabs>
            <Modal
              title="上传提示"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className={styles.hintSuccess}>
                已上传成功<span className={styles.textGreen}>100</span>条数据&nbsp;&nbsp;
                失败<span className={styles.textRed}>20</span>条数据
              </div>
              <div className={styles.hintTitle}>
                <strong>传输失败列表</strong>
              </div>
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ y: 170 }}
                pagination={false}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
    );
  }
}