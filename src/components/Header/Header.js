import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    const styles = require('./style/header.less');
    return (
    	<div className={styles.header}>this is headers</div>
    );
  }
}
