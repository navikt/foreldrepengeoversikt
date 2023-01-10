import Environment from '../Environment';
import EttersendingDto from './types/ettersending/EttersendingDto';
import AxiosApiInterceptor from './interceptor';
import axios from 'axios';
import { formaterDato } from 'app/utils/dateUtils';
import { Dekningsgrad } from 'app/types/Dekningsgrad';

export interface GetTilgjengeligeStønadskontoerParams {
    antallBarn: number;
    morHarRett: boolean;
    farHarRett: boolean;
    dekningsgrad: Dekningsgrad;
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

const getSakerv2 = () => {
    return AxiosApiInterceptor.get('innsyn/v2/saker');
};

const sendEttersending = (ettersending: EttersendingDto) => {
    return AxiosApiInterceptor.post('/soknad/ettersend', ettersending, {
        timeout: 120 * 1000,
    });
};

const getStorageKvittering = () => {
    return AxiosApiInterceptor.get('/storage/kvittering/foreldrepenger', {
        timeout: 15 * 1000,
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
        params: { saksnummer },
    });
};

const getManglendeVedlegg = (saksnummer: string) => {
    return AxiosApiInterceptor.get('/historikk/vedlegg', {
        params: { saksnummer },
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
    startdatoUttak,
}: GetTilgjengeligeStønadskontoerParams) {
    const fpUttakServiceDateFormat = 'YYYYMMDD';
    const urlParams = {
        farHarRett,
        morHarRett,
        morHarAleneomsorg: morHarAleneomsorg || false,
        farHarAleneomsorg: farHarAleneomsorg || false,
        dekningsgrad,
        antallBarn,
        fødselsdato: fødselsdato ? formaterDato(fødselsdato, fpUttakServiceDateFormat) : undefined,
        termindato: termindato ? formaterDato(termindato, fpUttakServiceDateFormat) : undefined,
        omsorgsovertakelseDato: omsorgsovertakelsesdato
            ? formaterDato(omsorgsovertakelsesdato, fpUttakServiceDateFormat)
            : undefined,
        startdatoUttak: formaterDato(startdatoUttak, fpUttakServiceDateFormat),
    };

    return axios.get(`${Environment.UTTAK_API_URL}/konto`, {
        timeout: 15 * 1000,
        params: urlParams,
    });
}

const Api = {
    getSaker,
    getSakerv2,
    getPersoninfo,
    sendEttersending,
    getStorageKvittering,
    getHistorikk,
    getMiniDialog,
    getUttaksplan,
    getUttakskontoer,
    getManglendeVedlegg,
};

export default Api;
