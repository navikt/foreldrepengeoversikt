import axios from 'axios';
import Environment from '../Environment';
import Ettersending from './types/Ettersending';
import AxiosWithInterceptor from './interceptor';

export const apiBaseUrl: string = Environment.REST_API_URL;

const getPersoninfo = () => {
    return AxiosWithInterceptor.get('/personinfo', {
        timeout: 60 * 1000
    });
};

const getSaker = () => {
    return AxiosWithInterceptor.get('innsyn/saker', {
        timeout: 60 * 1000
    });
};

const sendEttersending = (ettersending: Ettersending) => {
    return AxiosWithInterceptor.post('/soknad/ettersend', ettersending, {
        timeout: 60 * 1000
    });
};

const getStorageKvittering = () => {
    return AxiosWithInterceptor.get('/storage/kvittering/foreldrepenger', {
        timeout: 15 * 1000
    });
};

const log = (error: any) => {
    return axios.post('/log', error, {
        timeout: 15 * 1000,
        headers: {
            'content-type': 'application/json'
        }
    });
};

const Api = { getSaker, getPersoninfo, sendEttersending, getStorageKvittering, log };

export default Api;
