import axios from 'axios';
import Environment from '../Environment';
import Ettersending from './types/Ettersending';

const apiBaseUrl: string = Environment.REST_API_URL;

const getSaker = () => {
    return axios.get(`${apiBaseUrl}/saker`, {
        timeout: 60 * 1000,
        withCredentials: true
    });
};

const sendEttersending = (ettersending: Ettersending) => {
    return axios.post(`${apiBaseUrl}/soknad/ettersend`, ettersending, {
        timeout: 60 * 1000,
        withCredentials: true
    });
};

const Api = { getSaker, sendEttersending };

export default Api;
