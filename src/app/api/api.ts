import axios from 'axios';
import Environment from '../Environment';
import Ettersending from './types/Ettersending';
import AxiosApiInterceptor from './interceptor';

export const apiBaseUrl: string = Environment.REST_API_URL;

const getPersoninfo = () => {
    return AxiosApiInterceptor.get('/personinfo', {
        timeout: 60 * 1000
    });
};

const getSaker = () => {
    return AxiosApiInterceptor.get('innsyn/saker', {
        timeout: 60 * 1000
    });
};

const sendEttersending = (ettersending: Ettersending) => {
    return AxiosApiInterceptor.post('/soknad/ettersend', ettersending, {
        timeout: 60 * 1000
    });
};

const getStorageKvittering = () => {
    return AxiosApiInterceptor.get('/storage/kvittering/foreldrepenger', {
        timeout: 15 * 1000
    });
};

const getHistorikk = () => {
    return AxiosApiInterceptor.get('/historikk/historikk', {
        timeout: 60 * 1000
    });
};

const getMiniDialog = () => {
    return AxiosApiInterceptor.get('/minidialog/minidialog', {
        timeout: 60 * 1000
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

const Api = { getSaker, getPersoninfo, sendEttersending, getStorageKvittering, getHistorikk, getMiniDialog, log };

export default Api;
