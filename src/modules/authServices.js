import { cloneDeep } from 'lodash';
import { SERVICE_URLS, API_STATUS } from '../modules/constants';
import { fetch } from './httpServices';
import { toast } from 'react-toastify';

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));
  
    if (user && user.jwt) {
      return { Authorization: 'Bearer ' + user.jwt };
    } else {
      return {};
    }
}
