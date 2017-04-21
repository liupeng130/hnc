/**
 * Created by
 * liupeng
 * on 2017/2/17.
 */
import React, {Component} from 'react';
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
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error('单张图片不能大于1M');
  }
  return isJPG && isLt1M;
}
export default class GoodsUp extends Component {
  state = {};
  handleChange = (info) => {

    if (info.file.status === 'done') {

      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      //注意：这里是实现成功 接受返回值 图片的url
      console.log(JSON.parse(info.file.response.data));
    }

  }
  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <div>
        {
          <div className="ui-bd" >
               <div className={styles.avatarcontainer} >
                   <img src={imageUrl} alt="" className={styles.avataruploaded}/>
                   <Input/>
               </div>
              <div className={styles.avatarcontainer} >
                <img src={imageUrl} alt="" className={styles.avataruploaded}/>
                <Input/>
              </div>
          </div>
        }
        <Upload
          className={styles.avataruploader}
          name="pictures"
          showUploadList={false}
          action="proxy/base/upload/uploadImgFile"
          beforeUpload={beforeUpload}
          onChange={this.handleChange.bind(this)}
          data={{platformId:2}}
          multiple={true}
        >
          {
            imageUrl ?
              <img src={imageUrl} alt="" className={styles.avatar} /> :
              <span className={styles.avataruploadertrigger}>添加图片</span>
          }
        </Upload>
      </div>
    );
  }
}

