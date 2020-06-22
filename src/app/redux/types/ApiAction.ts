import { FetchError } from './FetchState';
import { StorageKvittering } from 'app/api/types/StorageKvittering';
import { Innsendingsinnslag, MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { Søkerinfo } from 'app/types/Søkerinfo';
import Sak from 'app/api/types/sak/Sak';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';

export enum ApiActionTypes {
    'GET_SØKERINFO_REQUEST' = 'getPersoninfoRequest',
    'GET_SØKERINFO_SUCCESS' = 'getPersoninfoSuccess',
    'GET_SØKERINFO_FAILURE' = 'getPersoninfoFailure',
    'GET_SAKER_REQUEST' = 'getSakerRequest',
    'GET_SAKER_SUCCESS' = 'getSøkerInfoSuccess',
    'GET_SAKER_FAILURE' = 'getSøkerInfoFailure',
    'GET_STORAGE_KVITTERING_REQUEST' = 'ggetStorageKvitteringRequest',
    'GET_STORAGE_KVITTERING_SUCCESS' = 'getStorageKvitteringSuccess',
    'GET_STORAGE_KVITTERING_FAILURE' = 'getStorageKvitteringFailure',
    'GET_HISTORIKK_REQUEST' = 'getHistorikkRequest',
    'GET_HISTORIKK_SUCCESS' = 'getHistorikkSuccess',
    'GET_HISTORIKK_FAILURE' = 'getHistorikkFailure',
    'GET_MINIDIALOG_REQUEST' = 'getMinidialogRequest',
    'GET_MINIDIALOG_SUCCESS' = 'getMinidialogSuccess',
    'GET_MINIDIALOG_FAILURE' = 'getMinidialogFailure',
    'GET_TILGJENGELIGE_STØNADSKONTOER' = 'getTilgjengeligeStønadskontoer',
    'GET_MANGLENDE_VEDLEGG_REQUEST' = 'getManglendeVedleggRequest',
    'GET_MANGLENDE_VEDLEGG_FAILURE' = 'getManglendeVedleggFailure',
    'GET_MANGLENDE_VEDLEGG_SUCCESS' = 'getManglendeVedleggSuccess',
}

export interface GetSøkerinfoRequest {
    type: ApiActionTypes.GET_SØKERINFO_REQUEST;
}

export interface GetSøkerinfoSuccess {
    type: ApiActionTypes.GET_SØKERINFO_SUCCESS;
    payload: {
        søkerinfo: Søkerinfo;
    };
}

export interface GetSøkerinfoFailure {
    type: ApiActionTypes.GET_SØKERINFO_FAILURE;
    payload: {
        error: FetchError;
    };
}

export interface GetSakerRequest {
    type: ApiActionTypes.GET_SAKER_REQUEST;
}

export interface GetSakerSuccess {
    type: ApiActionTypes.GET_SAKER_SUCCESS;
    payload: {
        saker: Sak[];
    };
}

export interface GetSakerFailure {
    type: ApiActionTypes.GET_SAKER_FAILURE;
    payload: {
        error: FetchError;
    };
}

export interface GetStorageKvitteringRequest {
    type: ApiActionTypes.GET_STORAGE_KVITTERING_REQUEST;
}

export interface GetStorageKvitteringSuccess {
    type: ApiActionTypes.GET_STORAGE_KVITTERING_SUCCESS;
    payload: {
        storageKvittering: StorageKvittering;
    };
}

export interface GetStorageKvitteringFailure {
    type: ApiActionTypes.GET_STORAGE_KVITTERING_FAILURE;
    payload: {
        error: FetchError;
    };
}

export interface GetHistorikkRequest {
    type: ApiActionTypes.GET_HISTORIKK_REQUEST;
}

export interface GetHistorikkSuccess {
    type: ApiActionTypes.GET_HISTORIKK_SUCCESS;
    payload: {
        historikk: Innsendingsinnslag[];
    };
}
export interface GetHistorikkFailure {
    type: ApiActionTypes.GET_HISTORIKK_FAILURE;
    payload: {
        error: FetchError;
    };
}

export interface GetMiniDialogRequest {
    type: ApiActionTypes.GET_MINIDIALOG_REQUEST;
}

export interface GetMinidialogSuccess {
    type: ApiActionTypes.GET_MINIDIALOG_SUCCESS;
    payload: {
        minidialogInnslagListe: MinidialogInnslag[];
    };
}
export interface GetMinidialogFailure {
    type: ApiActionTypes.GET_MINIDIALOG_FAILURE;
    payload: {
        error: FetchError;
    };
}

export interface GetTilgjengeligeStønadskontoer {
    type: ApiActionTypes.GET_TILGJENGELIGE_STØNADSKONTOER;
    payload: {
        sak: Sak;
    };
}

export interface GetManglendeVedleggRequest {
    type: ApiActionTypes.GET_MANGLENDE_VEDLEGG_REQUEST;
}

export interface GetManglendeVedleggRequestSuccess {
    type: ApiActionTypes.GET_MANGLENDE_VEDLEGG_SUCCESS;
    payload: {
        manglendeVedlegg: ManglendeVedlegg[];
    };
}
export interface GetManglendeVedleggRequestFailure {
    type: ApiActionTypes.GET_MANGLENDE_VEDLEGG_FAILURE;
    payload: {
        error: FetchError;
    };
}

type ApiAction =
    | GetSøkerinfoRequest
    | GetSøkerinfoSuccess
    | GetSøkerinfoFailure
    | GetSakerRequest
    | GetSakerSuccess
    | GetSakerFailure
    | GetStorageKvitteringRequest
    | GetStorageKvitteringSuccess
    | GetStorageKvitteringFailure
    | GetHistorikkRequest
    | GetHistorikkSuccess
    | GetHistorikkFailure
    | GetMiniDialogRequest
    | GetMinidialogSuccess
    | GetMinidialogFailure
    | GetTilgjengeligeStønadskontoer
    | GetManglendeVedleggRequest
    | GetManglendeVedleggRequestFailure
    | GetManglendeVedleggRequestSuccess;

export default ApiAction;
