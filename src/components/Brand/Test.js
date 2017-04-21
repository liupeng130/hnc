import React, {Component} from 'react';
import { Input } from 'jcloudui';
export default class Footer extends Component {

  render() {
    const styles = require('./style/footer.less');
    return (
      <div className={styles.footer}>
      <a>关于我们</a><span>|</span>
      <a>联系我们</a><span>|</span>
      <a>友情链接</a>
      </div>
    );
  }
}
