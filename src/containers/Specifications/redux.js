/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:specification
 ****************************************************************/
const LOADING = 'redux/Specifications/LOADING';
const LOAD_SUCCESS = 'redux/Specifications/LOAD_SUCCESS';
const LOADING_FAIL = 'redux/Specifications/LOADING_FAIL';
//编辑
const EDIT_FAIL = 'redux/Specifications/EDIT_FAIL';
const EDIT_SUCESS = 'redux/Specifications/EDIT_SUCESS';
const EDITING = 'redux/Specifications/EDITING';
//保存
const SAVING = 'redux/Specifications/SAVING';
const SAVE_SUCCESS = 'redux/Specifications/SAVE_SUCCESS';
const SAVE_FAIL = 'redux/Specifications/SAVE_FAIL';
//停用
const STOPING = 'redux/Specifications/STOPING';
const STOP_SUCCESS = 'redux/Specifications/STOP_SUCCESS';
const STOP_FAIL = 'redux/Specifications/STOP_FAIL';
//上移下移
const MOVING = 'redux/Specifications/MOVING';
const MOVE_SUCCESS = 'redux/Specifications/MOVE_SUCCESS';
const MOVE_FAIL = 'redux/Specifications/MOVE_FAIL';
//置顶置底
const TOING = 'redux/Specifications/TOING';
const TO_SUCCESS = 'redux/Specifications/TO_SUCCESS';
const TO_FAIL = 'redux/Specifications/TO_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  editData: false
};
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case LOADING_FAIL:
      return {
        ...state,
        loading: false
      };
    // 编辑 查看
    case EDITING:
      return {
        ...state,
        loading: true
      }
    case EDIT_SUCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        editData: action
      }
    case EDIT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        editError: action
      }
    //保存修改
    case SAVING:
      return {
        ...state,
        loading: true
      }
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        saveData: action.result
      }
    case SAVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        saveError: action.error.message
      }
    // 停用
    case STOPING:
      return {
        ...state,
        loading: true
      }
    case STOP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        stopData: action.result
      }
    case STOP_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        stopError: action.error.message
      }
    //上移下移
    case MOVING:
      return {
        ...state,
        loading: true
      }
    case MOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        moveData: action.result
      }
    case MOVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        moveError: action.error.message
      }
    //置顶置底
    case TOING:
      return {
        ...state,
        loading: true
      }
    case TO_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        toData: action.result
      }
    case TO_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        toError: action.error.message
      }
    default:
      return state;
  }
}
// test
export function isLoading(globalState){
	console.log('this is a isLoading1');
	return {
		 type: LOADING
	}
}
//查看和编辑
export function edit(param){
	return {
		types: [EDITING, EDIT_SUCESS, EDIT_FAIL],
    	promise: (client) => client.get('/item/platform/categoryAttribute/queryPlatformCategoryAttributeByAttrID', {
    		params: param
    	})
	}
}
//保存
export function saveEdit(param) {
	return {
		types: [SAVING, SAVE_SUCCESS, SAVE_FAIL],
    	/*promise: (client) => client.post('/platform/categoryAttribute/updatePlatformCategoryAttribute?platformId=' + param.platformId, {
    		params: JSON.parse(JSON.stringify(param.platformCategoryAttribute))
    	})*/
    	promise: (client) => client.post('/item/platform/categoryAttribute/updatePlatformCategoryAttribute', {
    		//data: JSON.parse(JSON.stringify(param))
        //platformAttributeParam: JSON.stringify(param)
        data: "platformAttributeParam="+JSON.stringify(param)
    	})
	}
}
//停用
export function stopUse(param) {
	return {
		types: [STOPING, STOP_SUCCESS, STOP_FAIL],
    	promise: (client) => client.post('/item/platform/categoryAttribute/updatePlatformAttributeState',{
    		data: param
    	})
	}
}
//上移下移
export function move(param) {
  console.log('上移下移');
  return {
    types: [MOVING, MOVE_SUCCESS, MOVE_FAIL],
    promise: (client) => client.get('/item/platform/categoryAttribute/updateSort',{
      params: param
    })
  }
}
//置顶置底
export function topBttom(param) {
  return {
    types: [TOING, TO_SUCCESS, TO_FAIL],
    promise: (client) => client.post('/item/platform/categoryAttribute/updateSortTop',{
      data: param
    })
  }
}
