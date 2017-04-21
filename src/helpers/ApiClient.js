import Api from 'jcloudecc/apiClient/ApiClient';

import config from '../config';

export default class ApiClient extends Api {
  constructor(req,res,operating) {
     super(config,req,res,operating)
  }
}

