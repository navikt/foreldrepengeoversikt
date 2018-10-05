import axios from 'axios';
import Environment from '../Environment';
import Ettersending from './types/Ettersending';

const apiBaseUrl: string = Environment.REST_API_URL;

const getSøkerInfo = () => {
    return axios.get(`${apiBaseUrl}/saker`, {
        timeout: 10 * 1000,
        withCredentials: true
    });
};

const sendEttersending = (ettersending: Ettersending) => {
    return axios.post(`${apiBaseUrl}/soknad/ettersend`, ettersending, {
        timeout: 10 * 1000,
        withCredentials: true
    });
};

const Api = { getSøkerInfo, sendEttersending };

export default Api;
