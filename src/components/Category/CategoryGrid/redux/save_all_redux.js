const LIST = 'category/grid/LOAD';
const LIST_SUCCESS = 'category/grid/LOAD_SUCCESS';
const LIST_FAIL = 'category/grid/LOAD_FAIL';
const CATEGORY_CHANGE = 'category/grid/CATEGORY_CHANGE';
const DELETE ='category/grid/DELETE';
const DELETE_SUCCESS='category/grid/DELETE_SUCCESS';
const DELETE_FAIL='category/grid/DELETE_FAIL';
const SORT ='category/grid/SORT';
const SORT_SUCCESS='category/grid/SORT_SUCCESS';
const SORT_FAIL='category/grid/SORT_FAIL';
const SAVE_ALL ='category/grid/SAVE_ALL';
const SAVE_ALL_SUCCESS='category/grid/SAVE_ALL_SUCCESS';
const SAVE_ALL_FAIL='category/grid/SAVEL_ALL_FAIL';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case SAVE_ALL:case SAVE_ALL_FAIL:
    return {
      ...state,
      error: action.error
    }
    case SAVE_ALL_SUCCESS:
      debugger;
      return{
        ...state,
        saveData: action.result.data,
        error:action.msg
      }
    default:
      return state
  }
}
/**
 * 保存全部更改
 * @param UUID
 * @param platformId
 * @returns {{types: *[], promise: (function(*): (Request|*))}}
 */
export function categorySaveAllChanges(UUID,platformId) {
  debugger;
  var params = {};
  params.platformId = platformId;
  params.uuid=UUID;
  return {
    types: [SAVE_ALL, SAVE_ALL_SUCCESS, SAVE_ALL_FAIL],
    promise: (client) => client.post('/item/platform/category/saveAllPlatformCategories',{data:params})
  }
}