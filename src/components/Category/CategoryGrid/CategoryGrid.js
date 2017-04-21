/**
 * Created by songshuangwang on 2017/1/19.
 */
import React, {Component,PropTypes}  from 'react';
import {Link} from 'react-router';
import {  Icon, Button, Modal ,Table ,Breadcrumb } from 'jcloudui';
import { Row, Col, Checkbox,message} from 'jcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryListActions from './redux/list_redux';
import * as categoryDeleteActions from './redux/delete_redux';
import * as categorySaveAllActions from './redux/save_all_redux';
import * as categorySortActions from './redux/sort_redux';
import * as categoryAddActions from './redux/add_redux';
import {getBrand} from '../CategoryView/redux';
import BaseComponent from '../../Common/BaseComponent';
import CategoryAdd from '../CategoryAdd/CategoryAdd';
import  Divider from '../../Common/Divider/Divider';
import  BtnGroup from '../BtnGroup/BtnGroup';
import  CategoryView from '../CategoryView/CategoryView';
message.config({top: 300, duration: 2,});//设置message的位置和延迟消失时间！
@connect(
    state => ({categoryList:{...state.categoryGird.category_grid_list,
                              ...state.categoryGird.category_grid_sort,
                              ...state.categoryGird.category_grid_save_all,
                              ...state.categoryGird.category_grid_delete
    },brands:state.brands,session:state.session}),
    dispatch => bindActionCreators({...categoryListActions,
      ...categorySortActions,...categoryDeleteActions,...categorySaveAllActions,...categoryAddActions,getBrand}, dispatch)


)
export default class CategoryGrid extends BaseComponent {
  static propTypes = {
    brands: PropTypes.object,
    getBrand: PropTypes.func.isRequired,
  };
    constructor(props,context) {
        super(props,context);
        this.state = {expandedRowKeys: [], visibleView: false, brand: {data: [], categoryId: ""}};
        this.state.visible = false;
        this.state.isSubmit = false;
        this.deleteObj=[];
        this.UUID="";
        this.state.newRandomKey = this.getUUID(32,16);

        this.categoryAddForm  = {};
    }



    handleExpandAll() {
        const data = this.props.categoryList.data;
        var keys  = [];
        this.seachAllKeys(data,keys);
        this.setState({expandedRowKeys: keys });
    }
    seachAllKeys(data,keys){
      for(var index in data){
        var key = data[index]["key"];
        keys.push(key);
        if(data[index]["children"]){
          this.seachAllKeys(data[index]["children"],keys)
        }
      }
    }
    handleCloseAll() {
        this.setState({expandedRowKeys: [] });
    }
    handleOnExpandedRowsChange(rows) {
        this.setState({expandedRowKeys: rows});
    }

    handleSaveAllPlatformCategories(){
      var $this=this;
      this.props.categorySaveAllChanges($this.UUID,$this.platformId)
        .then(function (a,b,c) {
          var isSuccess = a.data.isSuccess;
          var msg = a.msg;
          if(isSuccess){
            Modal.success({
              title: '提示信息',
              content: '保存成功',
            });
          }else{
            Modal.error({
              title: '提示信息',
              content: '保存失败，'+msg,
            });
          }
      },
          //服务器失败
        function (a,b,c) {
          var result  = a.response.text;
          Modal.error({
            title: '提示信息',
            content: '保存失败，'+result.msg,
          });
        })



    }
    handleSort(record,direction){
      let data=this.props.categoryList.data;
      var $this=this;
      this.props.categorySort(data,record,direction,$this.UUID,$this.platformId);
    }

    handelDelete(record) {
      const data = this.props.categoryList.data;
      var categoryDelete = this.props.categoryDelete;
      var $this=this;
        Modal.confirm({
            title: '提示',
            content: '请确认是否要删除',
            onOk(close) {
              if(record){
                var cid= record.cid;
                var key=record.key;
                var cids=[]; cids.push(cid);
                categoryDelete(data,cids,key,"delete",$this.UUID,$this.platformId).
                then(function(result){
                    if(result.code && result.code=='0'){
                      message.success('删除平台类目成功！');
                    }else{
                      message.error(result.msg);
                    }
                  }
                );
              }else{

                $this.props.batchCategoryDelete(data,$this.UUID,$this.platformId).then(function (result) {
                  if(result.code && result.code=='0'){
                    message.success('删除平台类目成功！');
                  }else{
                    message.error(result.msg);
                  }
                });
              }
              close();
            },
            onCancel() {
              return;
            },
        });
    }


  handleDoEdit(record){
    if(record){
       this.categoryAddForm = record ;
       this.categoryAddForm.parentCidView = record.categoryName
      this.categoryAddForm.grandCid = record.parentCid;
      this.categoryAddForm.uuid = this.UUID;
    }
    this.showModel();
  }

  handleAddChildCategory(record){ //添加字分类
    //如果cid有值，且大于0则为 子节点的父节点
    this.categoryAddForm = {};
    if(record.cid && record.cid >0){
      this.categoryAddForm.parentCid = record.cid;
      this.categoryAddForm.grandCid = record.parentCid;
      this.categoryAddForm.parentCidView = record.categoryName;
    }else{
      this.categoryAddForm.parentCid = -1;
      this.categoryAddForm.grandCid = -1;
    }

    if(record.lev && record.lev >0){
      this.categoryAddForm.lev = record.lev +1;
    }
    this.categoryAddForm.cid = -1;
    this.categoryAddForm.uuid = this.UUID;
    this.categoryAddForm.platformId = this.platformId;
    //todo 动态计算
    this.categoryAddForm.sortNumber = 1;
    this.categoryAddForm.hasLeaf = 0;
    //设置当前子节点的key
    var keyIndex = record.key;
    if(record.children && record.children.length >0){
      keyIndex+=("-"+record.children.length)
    }else{
      keyIndex+="-0";
    }
    this.categoryAddForm.key = keyIndex;
    this.showModel()
  }

  handleAddCategory() { //增加一级分类
    this.categoryAddForm = {};
    this.categoryAddForm.cid = -1;
    this.categoryAddForm.lev = 1;
    this.categoryAddForm.parentCid = -1;
    this.categoryAddForm.grandCid = -1;
    const  data = this.props.categoryList.data;
    if(data && data.length>0){
      this.categoryAddForm.sortNumber = data.length + 1;
    }
    this.categoryAddForm.uuid = this.UUID;
    this.categoryAddForm.platformId = this.platformId;
    this.categoryAddForm.hasLeaf = 0;
    var list = this.props.categoryList.data;
    var keyIndex = 0;
     if(list.length > 0){
       keyIndex = list.length;
     }
    this.categoryAddForm.key = keyIndex;
    this.showModel()

  }


  handleCancel(e) {
    this.setState({
      visible: false,
    });

  }
  //只为打开对话框
  showModel(){
    this.setState({
      visible: true,
    });
    this.state.newRandomKey=this.getUUID(32,16);//添加完了之后清空旧数据，从新渲染组件
  }


  handleOk(e) {

    var categoryAdd = this.refs.categoryAdd;
    var _this = this;
    if(categoryAdd){
      categoryAdd.validateFields((errs,values)=>{
        if(!errs){
          //向后台发送请求
          //处理表单数据。如果终极分类是 ，则有计量单位
          if(values.hasLeaf !=1){
            values.unit = "";
          }

          this.props.submit(values).then(function(a,b,c){
            if(a && a.code ==0){
              message.success(a.msg);
              //修改数据显示
              var categoryId = a.data.categoryId;

              var list = _this.props.categoryList.data;
              var temp = (values.key +"").split("-");
              //temp length 是几， 那就是几级
              if(temp.length==1){
                //如果values cid 有值则代表 编辑 ，否则是新增
                if(values.cid > 0){ //编辑
                  //拿到当前数据重新复制
                 // list[temp[0]] = values;
                  var t = list[temp[0]];
                  t.categoryName = values.categoryName;
                  t.sortNumber = values.sortNumber;
                  t.keyWords = values.keyWords;
                  t.hasLeaf = values.hasLeaf;
                  t.unit = values.unit;
                }else{//新增
                  values.cid = categoryId;
                  list.push(values);
                }
              }
              if(temp.length==2){
                //如果values cid 有值则代表 编辑 ，否则是新增
                if(values.cid > 0){ //编辑
                  //拿到当前数据重新复制
                //  list[temp[0]].children[temp[1]] = values;
                  var t = list[temp[0]].children[temp[1]];
                  t.categoryName = values.categoryName;
                  t.sortNumber = values.sortNumber;
                  t.keyWords = values.keyWords;
                  t.hasLeaf = values.hasLeaf;
                  t.unit = values.unit;
                }else{//新增
                  values.cid = categoryId;
                  if(!list[temp[0]].children){
                    list[temp[0]].children = [];
                  }
                  list[temp[0]].children.push(values)
                }

              }

              if(temp.length==3){
                //如果values cid 有值则代表 编辑 ，否则是新增
                if(values.cid > 0){ //编辑
                  //拿到当前数据重新复制
               //   list[temp[0]].children[temp[1]].children[temp[2]] = values;
                  var t = list[temp[0]].children[temp[1]].children[temp[2]];
                  t.categoryName = values.categoryName;
                  t.sortNumber = values.sortNumber;
                  t.keyWords = values.keyWords;
                  t.hasLeaf = values.hasLeaf;
                  t.unit = values.unit;
                }else{//新增
                  values.cid = categoryId;
                  if(!list[temp[0]].children[temp[1]].children){
                    list[temp[0]].children[temp[1]].children = []
                  }
                  list[temp[0]].children[temp[1]].children.push(values)
                }

              }
              if(temp.length ==4){
                if(values.cid > 0){ //编辑
                  //拿到当前数据重新复制
               //   list[temp[0]].children[temp[1]].children[temp[2]].children[temp[3]] = values;
                  var t = list[temp[0]].children[temp[1]].children[temp[2]].children[temp[3]];
                  t.categoryName = values.categoryName;
                  t.sortNumber = values.sortNumber;
                  t.keyWords = values.keyWords;
                  t.hasLeaf = values.hasLeaf;
                  t.unit = values.unit;
                }else{//新增
                  values.cid = categoryId;
                  if(!list[temp[0]].children[temp[1]].children[temp[2]].children){
                    list[temp[0]].children[temp[1]].children[temp[2]].children = [];
                  }
                  list[temp[0]].children[temp[1]].children[temp[2]].children.push(values)
                }

              }

              //修改前台view
              try{
                _this.props.categoryAddChange(list);
              }catch(e){
                console.log(e)
              }

              //成功回调
              _this.setState({
                visible:false,
                newRandomKey:_this.getUUID(32,16) //添加完了之后清空旧数据，从新渲染组件
              });

            }else{
              message.error(a.msg);

            }

          });
        }
      });
    }
  }


  handleSelectChangeStatus(e,record){
    let data=this.props.categoryList.data;
    this.props.selectChangeStatus(data,record);
  }

  handleCancelBrand() {
    this.setState({
      visibleView: false
    });
  }
  handleAlreadyOk() {
    this.setState({
      visibleView: false
    });
  }

  handleAddData(dataArr, id) {
    this.setState({
      brand: {
        data: this.state.brand.data.concat(dataArr),
        categoryId: id
      }
    })
  }

  handleDeleteData(record, id){
    const data = this.state.brand.data.filter(item => item !== record);
    this.setState({
      brand: {
        data,
        categoryId: id
      }
    });
  }

  onCellClick(record) {
      const platformId = 2;
      if (this.state.brand.categoryId === record.cid) {
        this.setState({
          visibleView: true
        })
      }else{
        this.setState({
          brand: {
            data: [],
            categoryId: record.cid
          }
        });
        this.props.getBrand(platformId, record.cid)
          .then(
            (function (brands) {
              const dataArr = [];
              for (let index = 0, length = brands.data ? brands.data.length : 0; index < length; index ++) {
                const data = {
                  key: brands.data[index].id,
                  name: brands.data[index].brandNameCh,
                  id: brands.data[index].id,
                  address: '解除关联',
                };
                dataArr.push(data);
              }
              console.log(dataArr);
              this.setState({
                visibleView: true,
                brand: {
                  data: dataArr,
                  categoryId: record.cid
                }
              })
            }).bind(this)
          );
      }
    }


  render() {
    console.log(this.state.expandedRowKeys);
      const styles = require('./style/categoryGrid.less');
      const {category} = this.props;
      const { Column } = Table;

    const  data = this.props.categoryList.data;
    if(data && data.length>0){
      this.categoryAddForm.sortNumber = data.length + 1;
    }
      return (
          <div>
            <Modal key={this.state.newRandomKey} title="添加新分类" okText= "保存" visible= {this.state.visible} onOk={()=>this.handleOk(event)} onCancel={()=>this.handleCancel()}>
              <CategoryAdd  categoryAddForm = {this.categoryAddForm}  ref="categoryAdd"/>
            </Modal>
              <CategoryView
                visibleView={this.state.visibleView}
                handleAlreadyOk={this.handleAlreadyOk.bind(this)}
                handleCancelBrand={this.handleCancelBrand.bind(this)}
                brand={this.state.brand}
                handleAddData={this.handleAddData.bind(this)}
                handleDeleteData={this.handleDeleteData.bind(this)}
                getUUID={this.getUUID}
              />
              <Breadcrumb style={{ margin: '12px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                  <Breadcrumb.Item>类目管理</Breadcrumb.Item>
              </Breadcrumb>
              <Row span={24} className={styles.title}>
                  <div><h4>类目管理</h4></div>
              </Row>

              <Row className={styles.BtnRow}>
                  <Col span={20}>
                      <BtnGroup>
                          <Button type="primary" icon="plus" onClick={()=>this.handleAddCategory()}>添加新分类</Button>
                          <Link to="/batchUpload"><Button type="default" icon="upload">批量上传</Button></Link>
                          <Button type="default" icon="down" onClick={()=>this.handleExpandAll()}>全部展开</Button>
                          <Button type="default" icon="up" onClick={()=>this.handleCloseAll()}>全部收起</Button>
                          <Button type="default" icon="delete" onClick={()=>this.handelDelete()}>删除</Button>
                      </BtnGroup>

                  </Col>
                  <Col span={4} className={styles.BtnRowRight}>
                      <Button type="default" onClick={()=>this.handleSaveAllPlatformCategories()}>保存全部更改</Button>
                  </Col>
              </Row>
              <Row>
                  <Col span={24}>
                      <Table dataSource={data}  pagination={false} expandedRowKeys={this.state.expandedRowKeys}
                             onExpandedRowsChange={(rows)=> this.handleOnExpandedRowsChange(rows)}
                      >
                          <Column
                              title="分类"
                              key="categoryName"
                              dataIndex="categoryName"
                              render={(text, record) => {
                                 return (
                                  <span>
                                      <Checkbox checked={record.isCheck} onChange={(event)=> this.handleSelectChangeStatus(event,record)}></Checkbox>{text}
                                  </span>
                                )}
                              }
                          />
                          <Column
                              title=""
                              render={(text, record) => {
                                return (
                                  <span>
                                  <Icon type="arrow-up" onClick={()=> this.handleSort(record,"up")}/>
                                    <Divider/>
                                  <Icon type="to-top" onClick={()=> this.handleSort(record,"top")}/>
                                  <Divider/>
                                  <Icon type="arrow-down" onClick={()=> this.handleSort(record,"down")} />
                                  <Divider/>
                                  <Icon type="download" onClick={()=> this.handleSort(record,"bottom")} />
                                </span>
                                )
                              }}
                          />
                          <Column
                              title="ID"
                              dataIndex="cid"
                              key="cid"
                          />
                          <Column
                              title="关键词"
                              dataIndex="keyWords"
                              key="keyWords"
                          />
                          <Column
                              title="计量单位"
                              dataIndex="unit"
                              key="unit"
                          />
                          <Column
                              title="品牌"
                              key="brand"
                              render={(text, record) => {
                                  return(
                                    <span>
                                       <a href="javascript:void(0);">查看</a>
                                    </span>
                                  )
                                }
                              }
                              onCellClick={this.onCellClick.bind(this)}
                          />
                          <Column
                              title="操作"
                              key="opt"
                              render={(text, record) => {
                                let level = record.lev;
                                let bool=true;
                                if(level && level!=4){
                                  if(record.hasLeaf==1){
                                    bool= false;
                                  }
                                }else{
                                  bool=false;
                                }
                                return (
                                  <span>
                                    {bool? <a href="javascript:void(0)" onClick={()=>this.handleAddChildCategory(record)}>添加子分类</a> : ''}
                                    {bool?<Divider/>:''}
                                    <a href="javascript:void(0)" onClick={()=>this.handleDoEdit(record)}>编辑</a>
                                    <Divider/>
                                    <a onClick={()=> this.handelDelete(record)}>删除</a>
                                  </span>
                                  )
                              }}
                          />
                      </Table>
                  </Col>
              </Row>
          </div>


      );
  }
  componentWillMount(){
      this.props.list(this.platformId);
      this.UUID=this.getUUID(32,16);//生成32位的uuid(base=16进制)
      console.log("category random uuid:"+this.UUID);
  }
  componentDidMount(){

  }
}