/**************************
 *@author:FengYan
 *@date:2017/03/02
 *@description：
 *************************/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {Upload, Icon, message, Button} from 'jcloudui';
import BaseComponent from '../../Common/BaseComponent';
import styles from './style/FileUp.less';
import {uploadPrams} from '../redux';

@connect(
  state => ({
    goodsRlease:state.goodsRlease,
    brandSelect:state.brandSelect,
    goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({uploadPrams}, dispatch)
)
class FileUp extends BaseComponent {
  constructor() {
    super();
    this.state = {
      upMsg: '',
      visible: true,
      fileAddr: ''
    };
    this.itemPulishVO = '';
  }
  beforeUpload = (file)=> {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('只可以上传以.pdf结尾的文件！');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('上传文件不可大于5M！');
    }
    return isPdf && isLt5M;
  };
  handleChange = (info) => {
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;

    if (info.file.status === 'done') {
      this.setState({
        upMsg: <div style={{color: 'green'}}>文件上传成功！</div>,
        fileAddr: info.file.name,
        visible: true,
      });
      //向父级组件返回上传文件url
      console.log(JSON.parse(info.file.response.data).pictureURL);
      let url = JSON.parse(info.file.response.data).pictureURL;
      //this.props.reUrl(JSON.parse(info.file.response.data).pictureURL);
      this.itemPulishVO.itemPicpdfManualVoList.push({
        platformId: 2,
        sellerId: -1,
        shopId: -1,
        picpdfUrl: url,
        picpdfName: ''
      });
      debugger;
    } else if (info.file.status === 'uploading') {
      this.setState({
        upMsg: <div>文件上传中...</div>
      })
    }
  };

  removeList() {
    this.setState({
      visible: false,
      upMsg:''
    });
    this.props.reUrl('');
  }
  componentWillMount(){
    this.props.fileAddr || (
      this.setState({
        visible: false
      })
    )
  }
  render() {
    const fileAddr = this.state.fileAddr || this.props.fileAddr;
    return (
      <div>
        <Upload
          name="file"
          action="/proxy/base/upload/uploadFile"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          data={{platformId: 2}}
          accept="application/pdf"
          showUploadList={false}
        >
          <Button>
            <Icon type="upload"/> 添加附件
          </Button>
          &nbsp;&nbsp;仅支持pdf格式，大小5M以内
        </Upload>
        {this.state.visible && (
          <div className={styles.fileList}>
            <Icon type="paper-clip" className={styles.fileIcon}/>
            {fileAddr}
            <Icon type="close" className={styles.fileClose} onClick={()=>this.removeList()}/>
          </div>)
        }
        {this.state.upMsg}
      </div>
    );
  }
}

export default FileUp;