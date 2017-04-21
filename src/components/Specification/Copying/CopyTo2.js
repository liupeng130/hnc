/**
 * Created by isssuer on 2017/2/14.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Tree , Button , Input} from 'jcloudui';
/*import { searchAllITEM } from './redux';*/
import { searchAllITEM , searchAllAttr, copySpecification, attrStep1 } from './redux';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

//树数据start
@connect(
  state => ({
    speciCopying: state.speciCopying
  }),
  dispatch => bindActionCreators({ searchAllITEM , searchAllAttr, copySpecification, attrStep1 }, dispatch)
)
export default class CopyTo2 extends Component {
  constructor() {
    super();
    this.state = {
      selectedKeys: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeysRt:[],
      checkedKeysLt:[],
      searchValue: '',
      sourceData: [],
      targetData:[],
      souce: [],
      expandleft:[],
      expandright: [],
      autoExpandParent: true,
      checked: true,


    };
    this.LtData =[];
    this.RtData =[];
    this.cData =[];
    this.sourceData = [];
    this.source = [];
    this.dataList = [];
    this.ifAll = true;
    this.init = true;
  }
  allSelectSource() {
    this.setState({
      checked: !this.state.checked
    });
    const data = [];
    if(this.souce){
      this.souce.map((item,index) => {
        data.push(item.cid.toString());
      });
    }
    console.log(data,'datadata');
    let objSource = document.getElementById('allSelectSource');
    if(objSource.checked){
      this.setState({
        expandedKeys: data,
        checkedKeysRt: data
      });
    }else{
      this.setState({
       expandedKeys: [],
       checkedKeysRt: []
      });
    }
  }
  /*目标数据全选与反选*/
  allSelectTarget() {
    
   /* let objTarget = document.getElementById('allSelectTarget');
      this.setState({
        expandedKeys2: data,
        checkedKeysLt: data
      });
    }*/
  }
  /*点击左复选框触发*/
  onCheck1(info) {
    console.log(info,'111111111111111111111111111111');
    this.setState({
      checkedKeysRt: info,
      selectedKeys1: info,
    });
  }
  /*点击左展开触发*/
  onSelect1(selectedKeys1, info) {
    console.log('onSelect', info);
     this.setState({ selectedKeys1 });
  }
  /*点击右复选框触发*/
  onCheck2(info) {
    console.log(info,'222222222222222222222222');
    this.setState({
      checkedKeysLt: info,
      selectedKeys2: info,
    });
  }
  /*点击右展开触发*/
  onSelect2(selectedKeys2, info) {
    console.log('onSelect', info);
    this.setState({ selectedKeys2 });
     console.log(selectedKeys2, 'selectedKeys2selectedKeys2selectedKeys2selectedKeys2selectedKeys2');
  }
  /*向右移动数据*/
  moveRight(source,target){
    let sourceData = [...source];
    const targetData = [...target];
    /*let sourceData = [
    {
        "cid": 1000064,
        "parentCid": -1,
        "platformId": 2,
        "categoryName": "安防/消防",
        "status": null,
        "lev": 1,
        "hasLeaf": 2,
        "sortNumber": 2,
        "homeShow": 1,
        "created": null,
        "modified": null,
        "keyWords": "关键词",
        "unit": null,
        "children": [
            {
                "cid": 1000066,
                "parentCid": 1000064,
                "platformId": 2,
                "categoryName": "安防1",
                "status": null,
                "lev": 2,
                "hasLeaf": 2,
                "sortNumber": 1,
                "homeShow": 1,
                "created": null,
                "modified": null,
                "keyWords": "关键词",
                "unit": null,
                "children": [
                    {
                        "cid": 1000015,
                        "parentCid": 1000064,
                        "platformId": 2,
                        "categoryName": "安防1-1",
                        "status": null,
                        "lev": 2,
                        "hasLeaf": 2,
                        "sortNumber": 1,
                        "homeShow": 1,
                        "created": null,
                        "modified": null,
                        "keyWords": "关键词",
                        "unit": null,
                    },
                    {
                        "cid": 1000013,
                        "parentCid": 1000064,
                        "platformId": 2,
                        "categoryName": "安防1-2",
                        "status": null,
                        "lev": 2,
                        "hasLeaf": 2,
                        "sortNumber": 1,
                        "homeShow": 1,
                        "created": null,
                        "modified": null,
                        "keyWords": "关键词",
                        "unit": null,
                    }

                ]
            },
            {
                "cid": 1000061,
                "parentCid": 1000064,
                "platformId": 2,
                "categoryName": "安防2",
                "status": null,
                "lev": 2,
                "hasLeaf": 2,
                "sortNumber": 1,
                "homeShow": 1,
                "created": null,
                "modified": null,
                "keyWords": "关键词",
                "unit": null,
                "children": [
                    {
                        "cid": 1000011,
                        "parentCid": 1000064,
                        "platformId": 2,
                        "categoryName": "安防2-1",
                        "status": null,
                        "lev": 2,
                        "hasLeaf": 2,
                        "sortNumber": 1,
                        "homeShow": 1,
                        "created": null,
                        "modified": null,
                        "keyWords": "关键词",
                        "unit": null,
                    },
                    {
                        "cid": 1000012,
                        "parentCid": 1000064,
                        "platformId": 2,
                        "categoryName": "安防2-2",
                        "status": null,
                        "lev": 2,
                        "hasLeaf": 2,
                        "sortNumber": 1,
                        "homeShow": 1,
                        "created": null,
                        "modified": null,
                        "keyWords": "关键词",
                        "unit": null,
                    }
                ]
            }

        ]
    }
   ];*/
    const {checkedKeysRt} = this.state;
    //let checkedKeysRt = ['1000015','1000012','1000061'];
    checkedKeysRt.map((checkName, index) => { //要查找的每一个元素
        sourceData.map((item1, index1) => { // 在第一级目录进行查找
        if (item1.cid == checkName) {
            let level1 = -1;
            targetData.map((item, index) => {
              if(targetData[index].cid == item1.cid){
                level1 = index;
                return;
              }
            })
            if(+level1 == -1) {
              targetData.push(JSON.parse(JSON.stringify(item1)));
              sourceData.splice(index1, 1);
            }else{}
        } else {
            if(item1.children !== undefined && item1.children !== null){
            item1.children.map((item2, index2) => { // 在第二级目录进行查找 
              if(item2.cid == checkName) {
                let level2 = -1;
                targetData.map((item,index) => {
                  if(item.cid == item1.cid){
                    level2 = index;
                    return;
                  }else{}
                })
                if (level2 == -1) { //如果第一级目录没有查找直接push整个的
                    targetData.push(JSON.parse(JSON.stringify(item1)));
                    targetData[(+targetData.length - 1)].children = [];//将他的children 置空
                    targetData[(+targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //添加新在当前目录下填加子元素
                    sourceData[index1].children.splice(index2, 1);
                    if(sourceData[index1].children.length == 0){
                      sourceData.splice(index1,1);
                    }else{}
                } 
                else {
                  targetData[level2].children.push((JSON.parse(JSON.stringify(item2)))); //如果
                   sourceData[index1].children.splice(index2, 1);
                   if(sourceData[index1].children.length == 0){
                      sourceData.splice(index1,1);
                    }else{}
                }
              }
              else {
                if (item2.children !== undefined && item2.children !== null) {
                item2.children.map((item3, index3) => { //在第三级目录中进行查找 
                  if(item3.cid == checkName) {
                    let level1 = -1;
                    let level2 = -1;
                    targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          return;
                          }
                      })
                    if (level1 == -1) { //查找到了判断最上级不存在
                      targetData.push(JSON.parse(JSON.stringify(item1))); // 将第一级加进去
                      targetData[(+targetData.length - 1)].children = []; //将第一级chirlden置空
                      targetData[(+targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级复制到第一级的chirldren
                      targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children = [];//将第三级置空
                      targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item3)))); //将对象添加到第三级中
                      level1 = -1;
                      level2 = -1;
                        targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
                              item.children.map((arritem, index) => {
                                if(arritem.cid = item2.cid){
                                  level2 = index;
                                  return;
                                }else{}
                              });
                            }else{}
                        }else{}
                      })
                     sourceData[index1].children[index2].children.splice(index3, 1);
                     if(sourceData[index1].children[index2].children.length == 0) {
                          sourceData[index1].children.splice(index2,1);
                          if(sourceData[index1].children.length == 0){
                              sourceData.splice(index1,1);
                            }else{}
                     }else{}
                    } 
                    else {
                        level2 = -1;
                        targetData.map((item,index) => {
                          if(item.children){
                            item.children.map((arritem, index) => {
                            if(arritem.cid == item2.cid){
                              level2 = index;
                              return;
                            }else{}
                          });
                          }else{}  
                        });
                        if (level2 == -1) { 
                           //level1 = targetData.indexOf(item1); //第一级存在第二级不存在
                           targetData[level1].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级加入到里面去
                           targetData[level1].children[+targetData[level1].children.length - 1].children = [];
                           targetData[level1].children[+targetData[level1].children.length - 1].children.push((JSON.parse(JSON.stringify(item3))));
                           sourceData[index1].children[index2].children.splice(index3, 1);
                           if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }else{}
                           }else{}
                        } else { //如果此元素存在在第三级
                          targetData[level1].children[level2].children.push((JSON.parse(JSON.stringify(item3))));
                          sourceData[index1].children[index2].children.splice(index3, 1);
                          if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }else{}
                           }else{}
                        }
                      }
                    }
                  else{
                    //在第四级目录进行查找
                    if (item3.children !== undefined && item3.children !== null) {
                      let level1 = -1;
                      let level2 = -1;
                      let level3 = -1;
                      targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
                              item.children.map((arritem, index) => {
                                if(arritem.cid = item2.cid){
                                  level2 = index;
                                }else{}
                                if(arritem.children){
                                  arritem.children.map((arr3item, index) => {
                                    if(arr3item.cid == item3.cid){
                                      level3 = index;
                                      return;  
                                    }
                                  });
                                }
                              });
                            }else{}
                        }else{}
                      })
                      item3.children.map((item4,index4)=>{
                        if (item4.cid == checkName) { //如果在第四级找到目标元素
                            if(level1 == -1){ //查找第一级目录是否存在
                              targetData.push((JSON.parse(JSON.stringify(item1)))); // 将第一级加进去
                              targetData[(+targetData.length - 1)].children = []; //将第一级chirlden置空
                              targetData[(+targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级复制到第一级的chirldren
                              targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children = [];//将第三级置空
                              targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item3)))); //将对象添加到第三级中
                              //第四级目录清空
                              let target4 = +targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].length;
                              targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children[target4].children = [];
                              targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children[target4].children.push((JSON.parse(JSON.stringify(item4))));
                              targetData.map((item,index) => {
                                  if(item.cid == item1.cid){
                                    level1 = index;
                                    return;
                                    if(item.children){
                                        item.children.map((arritem, index) => {
                                          if(arritem.cid == item2.cid){
                                            level2 = index;
                                          }else{}
                                          if(arritem.children){
                                            arritem.children.map((arr3item, index) => {
                                              if(arr3item.cid == item3.cid){
                                                level3 = index;
                                                return;
                                              }
                                            });
                                          }
                                        });
                                      }else{}
                                  }else{}
                                })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                  if(sourceData[index1].children[index2].children.length == 0) {
                                    sourceData[index1].children.splice(index2,1);
                                      if(sourceData[index1].children.length == 0){
                                          sourceData.splice(index1,1);
                                        }else{}
                                   }else{}
                              }else{}
                            } else if(level2 == -1) { //第二级不存在
                              targetData[level1].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级加入到里面去
                              targetData[level1].children[+targetData[level1].children.length - 1].children = [];
                              targetData[level1].children[+targetData[level1].children.length - 1].children.push((JSON.parse(JSON.stringify(item3))));
                              targetData[level1].children[targetData[(+targetData[level1].children.length - 1)].children.length - 1].children = [];//将第三级置空
                              targetData[level1].children[targetData[(+targetData[level1].children.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item4)))); //将对象添加到第三级中
                              targetData.map((item,index) => {
                                if(item.cid == item1.cid){
                                  level1 = index;
                                  return;
                                  if(item.children){
                                      item.children.map((arritem, index) => {
                                        if(arritem.cid == item2.cid){
                                          level2 = index;
                                        }else{}
                                        if(arritem.children){
                                          arritem.children.map((arr3item, index) => {
                                            if(arr3item.cid == item3.cid){
                                              level3 = index;
                                              return;
                                            }
                                          });
                                        }
                                      });
                                    }else{}
                                }else{}
                              })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                    if(sourceData[index1].children[index2].children.length == 0) {
                                    sourceData[index1].children.splice(index2,1);
                                    if(sourceData[index1].children.length == 0){
                                      sourceData.splice(index1,1);
                                    }else{}
                               }else{}
                              }else{}
                            } else if (level3 == -1){ 
                            //第三级目录不存在
                              targetData[level1].children[level2].children.push(JSON.parse(JSON.stringify(item3)));
                              targetData[level1].children[level2].children[+targetData[level1].children[level2].children.length - 1].children = [];
                              targetData[level1].children[level2].children[+targetData[level1].children[level2].children.length - 1].children.push((JSON.parse(JSON.stringify(item4))));
                              targetData.map((item,index) => {
                                  if(item.cid == item1.cid){
                                    level1 = index;
                                    return;
                                    if(item.children){
                                        item.children.map((arritem, index) => {
                                          if(arritem.cid == item2.cid){
                                            level2 = index;
                                          }else{}
                                          if(arritem.children){
                                            arritem.children.map((arr3item, index) => {
                                              if(arr3item.cid == item3.cid){
                                                level3 = index;
                                                return;
                                              }
                                            });
                                          }
                                        });
                                      }else{}
                                  }else{}
                                })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }else{}
                           }else{}
                              }else{}
                            } else {
                              targetData[level1].children[level2].children[level3].children.push((JSON.parse(JSON.stringify(item4))));
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }else{}
                           }else{}
                              }else{}
                            } 
                        } else {

                        }
                      });
                    }else{}
                  }
                });
                }else{}
              }
            });
            }else{}
        }
    });
  });
  this.souce = sourceData;
  this.setState({
    souce: sourceData,
    targetData
  });
  let detail = this.detailData(targetData);
  this.props.attrStep1(detail);
  }
  /*向左移动数据*/
  moveLeft(source,target){
    let sourceData = [...target];
    const targetData = [...source];
    const {checkedKeysLt} = this.state;
     checkedKeysLt.map((checkName, index) => { //要查找的每一个元素
        sourceData.map((item1, index1) => { // 在第一级目录进行查找
        if (item1.cid == checkName) {
            let level1 = -1;
            targetData.map((item, index) => {
              if(targetData[index].cid == item1.cid){
                level1 = index;
                return;
              }
            })
            if(+level1 == -1) {
              targetData.push(JSON.parse(JSON.stringify(item1)));
              sourceData.splice(index1, 1);
            }else{}
        } else {
            if(item1.children !== undefined && item1.children !== null){
            item1.children.map((item2, index2) => { // 在第二级目录进行查找 
              if(item2.cid == checkName) {
                let level2 = -1;
                targetData.map((item,index) => {
                  if(item.cid == item1.cid){
                    level2 = index;
                    return;
                  }else{}
                })
                if (level2 == -1) { //如果第一级目录没有查找直接push整个的
                    targetData.push(JSON.parse(JSON.stringify(item1)));
                    targetData[(+targetData.length - 1)].children = [];//将他的children 置空
                    targetData[(+targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //添加新在当前目录下填加子元素
                    sourceData[index1].children.splice(index2, 1);
                    if(sourceData[index1].children.length == 0){
                      sourceData.splice(index1,1);
                    }else{}
                } 
                else {
                  targetData[level2].children.push((JSON.parse(JSON.stringify(item2)))); //如果
                   sourceData[index1].children.splice(index2, 1);
                   if(sourceData[index1].children.length == 0){
                      sourceData.splice(index1,1);
                    }else{}
                }
              }
              else {
                if (item2.children !== undefined && item2.children !== null) {
                item2.children.map((item3, index3) => { //在第三级目录中进行查找 
                  if(item3.cid == checkName) {
                    let level1 = -1;
                    let level2 = -1;
                    targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          return;
                          }
                      })
                    if (level1 == -1) { //查找到了判断最上级不存在
                      targetData.push(JSON.parse(JSON.stringify(item1))); // 将第一级加进去
                      targetData[(+targetData.length - 1)].children = []; //将第一级chirlden置空
                      targetData[(+targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级复制到第一级的chirldren
                      targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children = [];//将第三级置空
                      targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item3)))); //将对象添加到第三级中
                      level1 = -1;
                      level2 = -1;
                        targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
                              item.children.map((arritem, index) => {
                                if(arritem.cid = item2.cid){
                                  level2 = index;
                                  return;
                                }else{}
                              });
                            }else{}
                        }else{}
                      })
                     sourceData[index1].children[index2].children.splice(index3, 1);
                     if(sourceData[index1].children[index2].children.length == 0) {
                          sourceData[index1].children.splice(index2,1);
                          if(sourceData[index1].children.length == 0){
                              sourceData.splice(index1,1);
                            }else{}
                     }else{}
                    } 
                    else {
                        level2 = -1;
                        targetData.map((item,index) => {
                          if(item.children){
                            item.children.map((arritem, index) => {
                            if(arritem.cid == item2.cid){
                              level2 = index;
                              return;
                            }else{}
                          });
                          }else{}  
                        });
                        if (level2 == -1) { 
                           //level1 = targetData.indexOf(item1); //第一级存在第二级不存在
                           targetData[level1].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级加入到里面去
                           targetData[level1].children[+targetData[level1].children.length - 1].children = [];
                           targetData[level1].children[+targetData[level1].children.length - 1].children.push((JSON.parse(JSON.stringify(item3))));
                           sourceData[index1].children[index2].children.splice(index3, 1);
                           if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }else{}
                           }else{}
                        } else { //如果此元素存在在第三级
                          targetData[level1].children[level2].children.push((JSON.parse(JSON.stringify(item3))));
                          sourceData[index1].children[index2].children.splice(index3, 1);
                          if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }else{}
                           }else{}
                        }
                      }
                    }
                  else{
                    //在第四级目录进行查找
                    if (item3.children !== undefined && item3.children !== null) {
                      let level1 = -1;
                      let level2 = -1;
                      let level3 = -1;
                      targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
                              item.children.map((arritem, index) => {
                                if(arritem.cid = item2.cid){
                                  level2 = index;
                                }else{}
                                if(arritem.children){
                                  arritem.children.map((arr3item, index) => {
                                    if(arr3item.cid == item3.cid){
                                      level3 = index;
                                      return;  
                                    }
                                  });
                                }
                              });
                            }else{}
                        }else{}
                      })
                      item3.children.map((item4,index4)=>{
                        if (item4.cid == checkName) { //如果在第四级找到目标元素
                            if(level1 == -1){ //查找第一级目录是否存在
                              targetData.push((JSON.parse(JSON.stringify(item1)))); // 将第一级加进去
                              targetData[(+targetData.length - 1)].children = []; //将第一级chirlden置空
                              targetData[(+targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级复制到第一级的chirldren
                              targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children = [];//将第三级置空
                              targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item3)))); //将对象添加到第三级中
                              //第四级目录清空
                              let target4 = +targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].length;
                              targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children[target4].children = [];
                              targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children[target4].children.push((JSON.parse(JSON.stringify(item4))));
                              targetData.map((item,index) => {
                                  if(item.cid == item1.cid){
                                    level1 = index;
                                    return;
                                    if(item.children){
                                        item.children.map((arritem, index) => {
                                          if(arritem.cid == item2.cid){
                                            level2 = index;
                                          }else{}
                                          if(arritem.children){
                                            arritem.children.map((arr3item, index) => {
                                              if(arr3item.cid == item3.cid){
                                                level3 = index;
                                                return;
                                              }
                                            });
                                          }
                                        });
                                      }else{}
                                  }else{}
                                })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                  if(sourceData[index1].children[index2].children.length == 0) {
                                    sourceData[index1].children.splice(index2,1);
                                      if(sourceData[index1].children.length == 0){
                                          sourceData.splice(index1,1);
                                        }else{}
                                   }else{}
                              }else{}
                            } else if(level2 == -1) { //第二级不存在
                              targetData[level1].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级加入到里面去
                              targetData[level1].children[+targetData[level1].children.length - 1].children = [];
                              targetData[level1].children[+targetData[level1].children.length - 1].children.push((JSON.parse(JSON.stringify(item3))));
                              targetData[level1].children[targetData[(+targetData[level1].children.length - 1)].children.length - 1].children = [];//将第三级置空
                              targetData[level1].children[targetData[(+targetData[level1].children.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item4)))); //将对象添加到第三级中
                              targetData.map((item,index) => {
                                if(item.cid == item1.cid){
                                  level1 = index;
                                  return;
                                  if(item.children){
                                      item.children.map((arritem, index) => {
                                        if(arritem.cid == item2.cid){
                                          level2 = index;
                                        }else{}
                                        if(arritem.children){
                                          arritem.children.map((arr3item, index) => {
                                            if(arr3item.cid == item3.cid){
                                              level3 = index;
                                              return;
                                            }
                                          });
                                        }
                                      });
                                    }else{}
                                }else{}
                              })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                    if(sourceData[index1].children[index2].children.length == 0) {
                                    sourceData[index1].children.splice(index2,1);
                                    if(sourceData[index1].children.length == 0){
                                      sourceData.splice(index1,1);
                                    }else{}
                               }else{}
                              }else{}
                            } else if (level3 == -1){ 
                            //第三级目录不存在
                              targetData[level1].children[level2].children.push(JSON.parse(JSON.stringify(item3)));
                              targetData[level1].children[level2].children[+targetData[level1].children[level2].children.length - 1].children = [];
                              targetData[level1].children[level2].children[+targetData[level1].children[level2].children.length - 1].children.push((JSON.parse(JSON.stringify(item4))));
                              targetData.map((item,index) => {
                                  if(item.cid == item1.cid){
                                    level1 = index;
                                    return;
                                    if(item.children){
                                        item.children.map((arritem, index) => {
                                          if(arritem.cid == item2.cid){
                                            level2 = index;
                                          }else{}
                                          if(arritem.children){
                                            arritem.children.map((arr3item, index) => {
                                              if(arr3item.cid == item3.cid){
                                                level3 = index;
                                                return;
                                              }
                                            });
                                          }
                                        });
                                      }else{}
                                  }else{}
                                })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }else{}
                           }else{}
                              }else{}
                            } else {
                              targetData[level1].children[level2].children[level3].children.push((JSON.parse(JSON.stringify(item4))));
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }else{}
                           }else{}
                              }else{}
                            } 
                        } else {

                        }
                      });
                    }else{}
                  }
                });
                }else{}
              }
            });
            }else{}
        }
    });
  });
  this.souce = targetData;
  this.setState({
    souce: targetData,
    targetData: sourceData
  });
  let detail = this.detailData(targetData);
  this.props.attrStep1(detail);
  
  console.log(this.props.speciCopying.attrAllData,'11111111111111111111111111111111111111');
  }
  loop = data => data.map((item) => {
      const index = item.categoryName.search(this.state.searchValue);
      const beforeStr = item.categoryName.substr(0, index);
      const afterStr = item.categoryName.substr(index + this.state.searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.categoryName}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.cid} title={item.categoryName}>
            {this.loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.cid} title={item.categoryName} />;
    });
  onChange = (e) => {
    const value = e.target.value;
    const dataArray = [];
    if(value != ''){
      this.souce.map((item, index) => {
        if(item.categoryName.indexOf(value) != -1){
          dataArray.push(item.cid.toString());
        }else{}
        if(item.children){
          item.children.map((item2, index2) => {
            if(item2.categoryName.indexOf(value) != -1){
              dataArray.push(item2.cid.toString());
            }else{}
            if(item2.children){
              item2.children.map((item3, index3) => {
                if(item3.categoryName.indexOf(value) != -1){
                  dataArray.push(item3.cid.toString());
                }else{}
                if(item3.children){
                  item3.children.map((item4, index4) => {
                    if(item4.categoryName.indexOf(value) != -1){
                      dataArray.push(item4.cid.toString());
                    }else{}
                  });
                }
              });
            }
          });
        }
      });
    }
    else {
      this.setState({
       expandedKeys: [],
       checkedKeysRt: []
      });
    }
    this.setState({
       expandedKeys: dataArray,
       checkedKeysRt: dataArray
      });
  }
  onExpandleft(expandleft) {
    console.log('onExpand', arguments);
    this.setState({
      expandleft,
      autoExpandParent: false,
    });
  }
  onExpandright(expandright) {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandright,
      autoExpandParent: false,
    });
  }
  detailData(data){
    const hasLeaf = [];
    if(data){
      data.map((item, index) => {
        if(+item.hasLeaf === 1){
          hasLeaf.push(item.cid);
        }else{}
        if(item.children){
          item.children.map((item2, index2) => {
            if(+item2.hasLeaf === 1){
              hasLeaf.push(item2.cid);
            }else{}
            if(item2.children){
              item2.children.map((item3, index3) => {
                 if(+item3.hasLeaf === 1){
                    hasLeaf.push(item3.cid);
                  }else{}
                  if(item3.children){
                    item3.children.map((item4, index4) => {
                     if(+item4.hasLeaf === 1){
                        hasLeaf.push(item4.cid);
                      }else{}
                    });
                  }else{}
              });
            }else{}
          });
        }else{}
      });
    }else{}
    return hasLeaf;
  }
  render() {
    if(this.props.speciCopying.itemloaded && this.init) {
          this.souce = this.props.speciCopying.itemData.data;
          if(this.ifAll){
            this.ifAll = false;
            const data = [];
            this.souce.map((item,index) => {
              data.push(item.cid.toString());
            });
            this.setState({
              souce: this.souce,
              expandedKeys: data,
              checkedKeysRt: data
            });
          }
          this.init = false;
      }else{}   
          /*搜索功能展示*/
    return (
      <div style = {{height: '330px',width: 'auto',overflow:'hidden'}} >
        <p style = {{fontWeight:'bold',marginBottom:'5px'}}>选择目标类目</p>
        <Search placeholder="输入关键字" onChange={this.onChange} style = {{width: '50%'}}/>
        <p style = {{margin:'5px 0'}}><span style = {{fontWeight:'bold',marginRight:'235px'}}>可选类目</span><span style = {{fontWeight:'bold'}}>已选类目</span></p>
        <div style = {{height: '250px',width: '42%',float:'left',border:'1px solid #ddd'}}>
          <p style = {{height: '30px'}}><input type = "checkbox" id = "allSelectSource" onClick={()=>{this.allSelectSource();}} checked = {this.state.checked} style = {{margin:'8px'}}/> <span>选择全部</span></p>
          <div style = {{height: '220px',width: '100%',overflowY:'scroll',borderTop:'1px solid #ddd'}}>
           {this.souce && (<Tree
              checkable
              checkedKeys = {this.state.checkedKeysRt}
              onExpand={::this.onExpandleft} 
              expandedKeys={this.state.expandleft}
              onCheck={::this.onCheck1}
              onSelect={::this.onSelect1}
              autoExpandParent={this.state.autoExpandParent}
            >
              {this.loop(this.state.souce)}
            </Tree>)} 
          </div>
        </div>
        <div style = {{height: '250px',width: '16%',float:'left'}}>
          <Button type="primary" onClick={()=>{this.moveRight(this.state.souce, this.state.targetData);}} style = {{margin:'70px 0 0 10px'}}>{'>>'}</Button>
          <Button type="primary" onClick={()=>{this.moveLeft(this.state.souce, this.state.targetData);}} style = {{margin:'10px'}}>{'<<'}</Button>
        </div>
        <div style = {{height: '250px',width: '42%',float:'left',border:'1px solid #ddd'}}>
          <div style = {{height: '220px',width: '100%',overflowY:'scroll',borderTop:'1px solid #ddd'}}>
            {this.state.targetData.length >= 1 && (<Tree
              checkable
              checkedKeys = {this.state.checkedKeysLt}
              onExpand={::this.onExpandright} 
              expandedKeys={this.state.expandright}
              onCheck={::this.onCheck2}
              onSelect={::this.onSelect2}
              autoExpandParent={this.state.autoExpandParent}
            >
              {this.loop(this.state.targetData)}
            </Tree>)}
          </div>
        </div>
      </div>
    );
  }
}