import React, {Component} from 'react';
export default class Footer extends Component {

  render() {
    const styles = require('./style/footer.less');
    return (
      <div className={styles.footer}>
          This is Footer
      </div>
    );
  }
}
