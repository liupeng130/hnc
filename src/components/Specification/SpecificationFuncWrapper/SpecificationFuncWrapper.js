/**
 * Created by huangxiao3 on 2017/2/14.
 */
import React, {Component, PropTypes} from 'react';
import SpecificationsAdd from 'components/Specification/SpecificationAdd/SpecificationAdd';

import Copying from 'components/Specification/Copying/Copying';
import { Button, Row, Col } from 'jcloudui';

export default class SpecificationFuncWrapper extends Component {
  //校验
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <Row style = {{background:'#f7f7f7',padding:'10px 15px', border: '1px solid #e9e9e9', borderLeft: 'none', borderRight: 'none'}}>
          <Col span={20}>
            <SpecificationsAdd onSearch={this.props.onSearch} />
          </Col>
          <Col span={4} style={{padding:"0 3px"}}>
            <Copying></Copying>
          </Col>
        </Row>
    );
  }

}
