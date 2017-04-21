const LIST = 'category/grid/LOAD';
const LIST_SUCCESS = 'category/grid/LOAD_SUCCESS';
const LIST_FAIL = 'category/grid/LOAD_FAIL';
export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case LIST:
      return {

        ...state,
        loading: true
      }
    case LIST_SUCCESS:

      console.log("action.result :"+action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: setCheckStatus(action.result.data)
      }
    case LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }

    default:
      return state
  }
}

export function list (platformId) {
  return {
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByPlatformId',{params:{platformId:platformId}})
  }
}

function setCheckStatus(data) {
  if(data && data.length>0){
    for(var i=0;i< data.length;i++){
      var info = data[i];
      data[i] = setIsCheck(info);
    }
  }
  return data;
}


function setIsCheck(obj)
{
  obj.isCheck = false;
  var child1=obj.children;
  if(child1 && child1.length>0){
    for (var i=0;i<child1.length;i++){
      child1[i].isCheck=false;
      var child2=child1[i].children;
      if(child2&&child2.length>0){
        for (var a=0;a<child2.length;a++) {
          child2[a].isCheck = false;
          var child3=child2[a].children;
          if(child3&&child3.length>0){
            for(var b=0;b<child3.length;b++){
              child3[b].isCheck = false;
            }
            child2[a].children=child3;
          }
        }
        child1[i].children=child2;
      }
    }
    obj.children=child1;
  }
  return obj;
}
