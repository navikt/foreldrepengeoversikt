import Environment from '../Environment';
import EttersendingDto from './types/ettersending/EttersendingDto';
import AxiosApiInterceptor from './interceptor';
import axios from 'axios';
import { formaterDato } from 'app/utils/dateUtils';

export interface GetTilgjengeligeStønadskontoerParams {
    antallBarn: number;
    morHarRett: boolean;
    farHarRett: boolean;
    dekningsgrad: '100' | '80';
    termindato?: string;
    fødselsdato?: string;
    omsorgsovertakelsesdato?: string;
    morHarAleneomsorg?: boolean;
    farHarAleneomsorg?: boolean;
    startdatoUttak: string;
}

const getPersoninfo = () => {
    return AxiosApiInterceptor.get('/sokerinfo');
};

const getSaker = () => {
    return AxiosApiInterceptor.get('innsyn/saker');
};

const sendEttersending = (ettersending: EttersendingDto) => {
    return AxiosApiInterceptor.post('/soknad/ettersend', ettersending, {
        timeout: 120 * 1000
    });
};

const getStorageKvittering = () => {
    return AxiosApiInterceptor.get('/storage/kvittering/foreldrepenger', {
        timeout: 15 * 1000
    });
};

const getHistorikk = () => {
    return AxiosApiInterceptor.get('/historikk');
};

const getMiniDialog = () => {
    return AxiosApiInterceptor.get('/minidialog');
};

const getUttaksplan = (saksnummer: string) => {
    return AxiosApiInterceptor.get('innsyn/uttaksplan', {
        params: { saksnummer }
    });
};

function getUttakskontoer({
    antallBarn,
    farHarRett,
    morHarRett,
    dekningsgrad,
    fødselsdato,
    termindato,
    omsorgsovertakelsesdato,
    morHarAleneomsorg,
    farHarAleneomsorg,
    startdatoUttak
}: GetTilgjengeligeStønadskontoerParams) {
    const urlParams = {
        farHarRett,
        morHarRett,
        morHarAleneomsorg: morHarAleneomsorg || false,
        farHarAleneomsorg: farHarAleneomsorg || false,
        dekningsgrad,
        antallBarn,
        fødselsdato: fødselsdato ? formaterDato(fødselsdato, 'YYYYMMDD') : undefined,
        termindato: termindato ? formaterDato(termindato, 'YYYYMMDD') : undefined,
        omsorgsovertakelseDato: omsorgsovertakelsesdato ? formaterDato(omsorgsovertakelsesdato, 'YYYYMMDD') : undefined,
        startdatoUttak: formaterDato(startdatoUttak, 'YYYYMMDD')
    };

    return axios.get(`${Environment.UTTAK_API_URL}/konto`, {
        timeout: 15 * 1000,
        params: urlParams
    });
}

const Api = {
    getSaker,
    getPersoninfo,
    sendEttersending,
    getStorageKvittering,
    getHistorikk,
    getMiniDialog,
    getUttaksplan,
    getUttakskontoer
};

export default Api;
