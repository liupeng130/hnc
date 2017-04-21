/****************************************************************
 * author:FengYan
 * date:2017-02-13
 * update2017-02-18
 * description:BrandListViews
 * childComponents:BrandListViews
 ****************************************************************/
import React, {Component} from 'react';
import { Table, Row, Col, Pagination } from 'jcloudui';
import styles from './style/BrandList.less';
class BrandListViews extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { tableColumns, tableData, pagination } = this.props.table;
    return (
      <Row>
        <Table
          columns = {tableColumns}
          dataSource = {tableData}
          pagination = {pagination}
        />
      </Row>
    );
  }
}

export default BrandListViews;
