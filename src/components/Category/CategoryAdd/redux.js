const LOAD = 'item/category/CategoryAdd/LOAD';
const LOAD_SUCCESS = 'item/category/CategoryAdd/LOAD_SUCCESS';
const LOAD_FAIL = 'item/category/CategoryAdd/LOAD_FAIL';
const CATE_LOAD_SUCCESS = 'item/category/CategoryAdd/CATE_LOAD_SUCCESS';

const SAVE_CATEGORY_URL = '/item/platform/category/savePlatformCategory';
const GET_CATE_BY_ID_URL = '/item/platform/category/getCategoriesByParentId';

export default function (state = {loading:false}, action = {}) {
    switch (action.type) {
        case LOAD:
          	return {
	            ...state,
	            loading: true
	        }
        case LOAD_SUCCESS:
            return {
	            ...state,
	            loading: false,
	            loaded: true,
	            data: action.result
	        }
       case LOAD_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.msg
        }

      case CATE_LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.result
        }

        default:
            return state
	}
}

export function submit (category) {

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post(SAVE_CATEGORY_URL,{data:category})
      .then(function (a,b,c) {

        return a;
      })
  }
}

export function getCategoryByPid(pid,platformId){
  var params = {};
  params.platformId = platformId;
  params.parentCategoryId = pid;
  return {
    types: [LOAD, CATE_LOAD_SUCCESS],
    promise: (client) => client.get(GET_CATE_BY_ID_URL,{params:params})
      .then(function (a,b,c) {
        return a;
      })
  }
}

