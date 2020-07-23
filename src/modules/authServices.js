import { cloneDeep } from 'lodash';
import { SERVICE_URLS, API_STATUS } from '../modules/constants';
import { fetch } from './httpServices';
import { toast } from 'react-toastify';

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.jwt) {
      return { Authorization: 'Bearer ' + user.jwt };
    } else {
      return {};
    }
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const validateUserEmail = (state, setState) => {

    const { username } = state;
    fetch.post( { url: SERVICE_URLS.LOGIN, requestBody: {username}, callbackHandler: ( response ) => {
            const { status, message } = response.payload;
            const _state = cloneDeep( state );
            _state.isLoading = false;
            if( status === API_STATUS.SUCCESS) {
                _state.message = message;
                _state.isValidEmail = true;
                _state.sendOtp = true;
                toast.success(_state.message);  
            } else {
                _state.message = message;
                _state.isValidEmail = false;
                toast.error(_state.message);
            }
            setState( _state );
        }
    });
}

export const verifyOtp = (state, setState, redirectDashboardPage) => {
    const { username, password } = state;
    fetch.post( { url: SERVICE_URLS.VERIFY_OTP, requestBody: {username, password}, callbackHandler: ( response ) => {
            const { status, message, login } = response.payload;
            const _state = cloneDeep( state );
            _state.isLoading = false;
            
            if( status === API_STATUS.SUCCESS && login.jwt) {
                _state.message = message;
                _state.login = login;
                _state.isValidOtp = true;
                toast.success(_state.message);
                localStorage.setItem("user", JSON.stringify(login));
                redirectDashboardPage();
            } else {
                _state.message = message;
                _state.isValidOtp = false;
                toast.error(_state.message);
            }

            setState( _state );
            
        }
    });
}