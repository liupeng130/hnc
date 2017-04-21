/****************************************************************
 * author:liupeng
 * date:2017-02-20
 * description:产品发布-图片上传
 ****************************************************************/
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGoodsInfo,uploadPrams,uploadPicture} from './redux';
import { Upload, Icon, message ,Input,Modal} from 'jcloudui';
import styles from './style/imageupload.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload (file) {
  const isJPG = file.type === 'image/jpg' ||'image/jpeg' || 'image/png' || 'image/JPG'|| 'image/JPEG'|| 'image/PNG';
  if (!isJPG) {
    message.error('允许的图片格式有jpg、jpeg、png、JPG、JPEG、PNG');
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('单张图片不能大于5M');
  }
  return isJPG && isLt5M;
}
@connect(
  state => ({
    goodsRlease:state.goodsRlease,
  }),
  dispatch => bindActionCreators({getGoodsInfo,uploadPrams,uploadPicture}, dispatch)
)
export default class GoodsPic extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userName:[],
      index :null
    };
    this.picUrls = [];
    this.loop = this.loop.bind(this);
    this.status = 1;
  }
  componentWillMount() {
      if(this.props.initialParent&&this.props.initialParent.length>0){
          this.picUrls = this.props.initialParent
      }
  }
  //上传
  handleChange = (info) => {
    console.log(info.file.status)
    if (info.file.status === 'done') {

      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      //注意：这里是实现成功 接受返回值 图片的url
      const urls = info.file.response.data.pictureURL;
      this.picUrls.push(
        {
          url:urls,
          alt:''
        }
      );
      /*this.setState({
          picUrls:this.state.picUrls
      });*/
      //子组件将数据传给父组件
      console.log(this.picUrls)
      this.status = 1;
      this.props.oncallbackparent?this.props.oncallbackparent(this.picUrls):
        this.props.oncallbackchirld(this.picUrls,this.props.record,this.status);
    }
  };
  //重新上传
  handleReChange = (info) => {
    if (info.file.status === 'done') {

      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      //注意：这里是实现成功 接受返回值 图片的url
      const url = info.file.response.data.pictureURL;
      this.picUrls.splice(this.state.index,1,{
        url:url,
        alt:''
      });
      //子组件将数据传给父组件
      this.status = 2;
      this.props.oncallbackparent?this.props.oncallbackparent(this.picUrls):
        this.props.oncallbackchirld(this.picUrls,this.props.record,this.status);
    }
  };
  //删除
  handleCancel = (index) => {
    this.picUrls.splice(index,1);
    //子组件将数据传给父组件
    this.status = 3;
    this.props.oncallbackparent?this.props.oncallbackparent(this.picUrls):
      this.props.oncallbackchirld(this.picUrls,this.props.record,this.status);
  };
  //重新上传时的下标
  handleReUpload = (index) => {
    this.state.index = index;
    this.setState({
      index:this.state.index
    });
    console.log(this.state.index)
  };
  //改变ALT
  onChangeAlt = (e) => {
    if(this.picUrls !== []&&this.picUrls.length>0){
       let len = this.picUrls.length;
       for(let i=0;i<len;i++){
         this.state.userName.push('')
       }
    }
    this.state.userName[e.target.id] = e.target.value
    this.setState({ userName: this.state.userName });
  };
  //失去焦点后确认输入ALT
  onBlurChange = (index) => {
    this.picUrls[index].alt = this.state.userName[index];
    //子组件将数据传给父组件
    this.status = 4;
    this.props.oncallbackparent?this.props.oncallbackparent(this.picUrls):
      this.props.oncallbackchirld(this.picUrls,this.props.record,this.status);
    console.log(this.picUrls);
  };
  //循环的到插入的每张照片
  loop = data => data.map((item,index) => {
    return (
      item.url?<div className={styles.avatarcontainer} key={index} >
        <div className={styles.avatarwrapper}>
          <div className={styles.avatardelete}>
              <span className={styles.deletespan}  onClick={function () {
                console.log(index);
                this.handleCancel(index);
              }.bind(this)} >{'删除'}</span>
            <Upload
              className={styles.reupload}
              name="pictures"
              showUploadList={false}
              action="/proxy/base/upload/uploadImgFile"
              beforeUpload={beforeUpload}
              onChange={this.handleReChange.bind(this)}
              data={{platformId:2}}
            >
                <span className={styles.reupload}  onClick={function () {
                  console.log(index);
                  this.handleReUpload(index);
                }.bind(this)} >{'重新上传'}</span>
            </Upload>
          </div>
          <img src={item.url} alt={item.alt} className={styles.avatar} />
        </div>
        <Input placeholder="标签" onChange={::this.onChangeAlt} onBlur={function () {
          console.log(index);
          this.onBlurChange(index);
        }.bind(this)} value={this.state.userName[index]} id={index}/>
      </div>:null
    );
  });
  componentWillUnmount(){
    this.picUrls = [];
  }
  render() {
    if(this.props.record&&this.props.record.pics&&this.props.record.pics.length>0){
      this.picUrls = this.props.record.pics;
    }
    const uploadButton = (
      <div className={styles.avatarcontainer}>
        <div className={styles.avatarwrapperadd}>
          <Upload
            className={styles.avataruploader}
            name="pictures"
            showUploadList={false}
            action="/proxy/base/upload/uploadImgFile"
            beforeUpload={beforeUpload}
            onChange={this.handleChange.bind(this)}
            data={{platformId:2}}
            multiple={true}
          >
            <span className={styles.avataruploadertrigger}>添加图片</span>
          </Upload>
        </div>
        <Input placeholder="输入ALT标签" disabled={true}/>
      </div>
    );
    return (
      <div className={styles.avatarfl}>
        {this.picUrls !==[]&&this.picUrls.length>0&&this.loop(this.picUrls)}
        {this.picUrls.length >=10?null:uploadButton}
      </div>
    );
  }
}
