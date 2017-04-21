/****************************************************************
 * author:FengYan
 * date:2017-02-13
 * description:GetAllCategory
 * childComponents:GetAllCategory
 ****************************************************************/
import React, {Component} from 'react';
import {Table, Modal, Row, Col, Input, Button, Tree, Popover} from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/* 自定义组件调用 */
import BaseComponent from '../../Common/BaseComponent';
import {GetAllCategoryAction} from './redux';
import styles from './style/category.less';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

@connect(
  state => ({category: state.getAllCategory}),
  dispatch => bindActionCreators({GetAllCategoryAction}, dispatch)
)
class GetAllCategory extends BaseComponent {
  constructor(props) {
    super(props);
    this.categoryRender = null;
    this.state = {
      expandedKeys: [],
      checkedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      popover: false
    };
    this.dataList = [];
    this.categoryTableList = [];
    this.categoryData = {};
    this.cids = [];
  }
  
  onChange(e) {
    
    // 搜索框
    const value = e.target.value;
    const expandedKeys = this.dataList.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return this.getParentKey(item.key, this.categoryData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }
  
  onExpand(expandedKeys) {
    //树形菜单节点展开时触发
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  
  onCheck(checkedKeys, e) {
    const checkedLength = checkedKeys.length;
    //保存拼接后的总title
    var checkedList = [];
    this.cids = [];
    for (let i = 0; i < checkedLength; i++) {
      //找到父节点的title，拼接成字符串
      const titleStr = this.getParentTitle(checkedKeys[i], this.categoryData.data);
      //将拼接好的字符串保存进数组中
      //保存之前先去重(排除掉非叶子节点的部分)
      if (titleStr != '000') {
        checkedList.push(titleStr);
      }
    }
    this.categoryTableList = [];
    checkedList.map((categoryName)=> {
      this.categoryTableList.push({
        firstLevName: categoryName.split('-')[0],
        secondLevName: categoryName.split('-')[1],
        thirdLevName: categoryName.split('-')[2],
        fourthLevName: categoryName.split('-')[3],
      })
    });
  }
  
  //封装一个函数用来通过key值找到相对于的title值
  getTitle(key, typeList) {
    const keylist = key.split("-");
    const keylength = keylist.length;
    switch (keylength) {
      case 1:
        return typeList[keylist[0]].categoryName;
        break;
      case 2:
        return typeList[keylist[0]].children[keylist[1]].categoryName;
        break;
      case 3:
        return typeList[keylist[0]].children[keylist[1]].children[keylist[2]].categoryName;
        break;
      case 4:
        return typeList[keylist[0]].children[keylist[1]].children[keylist[2]].children[keylist[3]].categoryName;
        break;
    }
  }

//封装一个函数用来通过叶子节点的key值找到其所有父节点的title值，并进行拼接和保存
  getParentTitle(keys, typeList) {
    //用来保存某个完整的title
    var str = keys.split(':')[1];
    var key = keys.split(':')[0];
    var cid = keys.split(':')[2];
    var keylist = key.split("-");
  
    const keylength = keylist.length;
    //先判断该节点是否为叶子节点（用children属性）
    var isLeaf = false;
    switch (keylength) {
      case 1:
        isLeaf = typeList[keylist[0]].children ? false : true;
        break;
      case 2:
        isLeaf = typeList[keylist[0]].children[keylist[1]].children ? false : true;
        break;
      case 3:
        isLeaf = typeList[keylist[0]].children[keylist[1]].children[keylist[2]].children ? false : true;
        break;
      case 4:
        isLeaf = typeList[keylist[0]].children[keylist[1]].children[keylist[2]].children[keylist[3]].children ? false : true;
        break;
    }
    //若为叶子节点则获取其父节点key
    if (isLeaf) {
      this.cids.push({cid:cid});
      //向子节点title前增加其父节点title，直到顶层节点结束
      while (keylist.length > 1) {
        keylist.pop();
        var parentKey = keylist.join("-");
        var parentTitle = this.getTitle(parentKey, typeList);
        str = parentTitle + "-" + str;
      }
      return str;
    } else {
      return '000';
    }
  }
  
  getParentKey(key, tree) {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  }
  
  generateList(data) {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      const title = node.title;
      this.dataList.push({key, title});
      if (node.children) {
        this.generateList(node.children, node.key);
      }
    }
  }
  
  getCategoryAction() {
    //初始化页面运行品牌列表展示
    this.props.GetAllCategoryAction({
      platformId: this.platformId
    });
  }
  
  categoryShow() {
    //显示类目列表
    this.getCategoryAction();
    this.setState({
      popover: true
    });
  }
  
  categoryLinkOn() {
    this.props.tableList(this.categoryTableList, this.cids);
    this.categoryHide();
  }
  
  categoryHide() {
    //隐藏类目列表
    this.setState({
      popover: false
    });
  }
  
  dataSource() {
    //redux结果集，统一封装调用
    return {
      allCategory: ()=> {
        //所有类目
        let DATA = this.props.category.data;
        this.categoryData = this.props.category.data;
        if (DATA.code == 0) {
          this.generateList(DATA.data);
          //查询的value，指定展开的树节点，是否自动展开父节点
          const {searchValue, expandedKeys, autoExpandParent} = this.state;
          
          //遍历添加所有的节点（为渲染到页面上做准备）
          const loop = data => data.map((item) => {
            
            //根据输入框内容查找标题对应的下标位置
            const index = item.categoryName.search(searchValue);
            //对应查找字符前面的内容（截取字符串）
            const beforeStr = item.categoryName.substr(0, index);
            //对应查找字符后面的内容
            const afterStr = item.categoryName.substr(index + searchValue.length);
            //如果存在节点中包含查找的字符则将其高亮显示，否则直接显示内容
            const categoryName = index > -1 ?
              (
                <span>{beforeStr} <span style={{color: '#f50'}}>{searchValue}</span>{afterStr}</span>
              ) :
              <span>{item.categoryName}</span>;
            //如果存在子节点则继续添加
            if (item.children) {
              return (
                <TreeNode
                  key={item.key + ':' + item.categoryName + ':' + item.cid}
                  title={categoryName}>
                  {loop(item.children)}
                </TreeNode>
              );
            }
            return <TreeNode
              key={item.key + ':' + item.categoryName + ':' + item.cid}
              title={categoryName}/>;
          });
          this.categoryRender = (
            <div>
              <Tree
                checkable
                onExpand={this.onExpand.bind(this)}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                className={styles.treeWidth}
                onCheck={this.onCheck.bind(this)}
              >
                {loop(DATA.data)}
              </Tree>
              <div className={styles.textCenter}>
                <Button type="primary" onClick={()=>this.categoryLinkOn()}>关联</Button>&nbsp;&nbsp;
                <Button onClick={()=>this.categoryHide()}>取消</Button>
              </div>
            </div>
          );
        } else {
          console.log(DATA.msg);
        }
      }
    }
  }
  
  render() {
    this.props.category.loaded && this.dataSource().allCategory();
    const categorySearch = (<Search style={{width: 300}} placeholder="输入类目名进行检索" onChange={this.onChange.bind(this)}/>);
    return (
      <div className={styles.div} id='div'>
        <Popover
          placement="bottom"
          title={categorySearch}
          content={this.categoryRender}
          className={styles.textCenter}
          visible={this.state.popover}
          getPopupContainer={()=>document.getElementById('div')}
          onCancel={()=>this.categoryHide()}
        >
          <Button type='ghost' onClick={()=>this.categoryShow()}>关联新类目</Button>
        </Popover>
      </div>
    )
  }
}

export default GetAllCategory;