import { combineReducers } from 'redux'
import category_grid_delete from 'components/Category/CategoryGrid/redux/delete_redux';
import category_grid_save_all from 'components/Category/CategoryGrid/redux/save_all_redux';
import category_grid_sort from 'components/Category/CategoryGrid/redux/sort_redux';
import category_grid_list from 'components/Category/CategoryGrid/redux/list_redux';
import category_grid_add from 'components/Category/CategoryGrid/redux/add_redux';
import common_redux from 'components/Category/CategoryGrid/redux/common_redux';
export default combineReducers({
  category_grid_delete,
  category_grid_save_all,
  category_grid_sort,
  category_grid_list,
  category_grid_add,
})
