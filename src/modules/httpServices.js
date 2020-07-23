import axios from 'axios';
import { API_STATUS } from '../modules/constants';

export const fetch = {
    get({ url, requestParams = {}, callbackHandler}) {
        const ins = axios.get(url, {
            params: requestParams
        });
        outputHandler({ ins, callbackHandler });
    },
    getExcel({ url, requestParams = {}, callbackHandler}) {
        const ins = axios.get(url, {
            params: requestParams,
            responseType: 'arraybuffer'
        });
        outputHandler({ ins, callbackHandler });
    },
    
    post({ url, requestBody = {}, callbackHandler }) {
        const ins = axios.post(url, {...requestBody });
        outputHandler({ ins, callbackHandler });
    },
    delete({ url, requestBody = {}, callbackHandler }) {
        const ins = axios.delete(url, {...requestBody });
        outputHandler({ ins, callbackHandler });
    },
    put({ url, requestBody = {}, callbackHandler }) {
        const ins = axios.put(url, {...requestBody });
        outputHandler({ ins, callbackHandler });
    }
    
};

const outputHandler = ({ ins, callbackHandler }) => {
    ins.then((response) => {

        callbackHandler({
            status: API_STATUS.SUCCESS,
            message: '',
            payload: response.data
        });

    }).catch( () => {
        callbackHandler({
            status: API_STATUS.FAILURE,
            message: 'Something went worng...',
            payload: {}
        });
    });

};