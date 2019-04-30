import Personinfo from "app/types/Personinfo";
import Sak from "app/types/Sak";
import { FetchError } from "./FetchState";
import { StorageKvittering } from "app/types/StorageKvittering";

export enum ApiActionTypes {
    'GET_PERSONINFO_REQUEST' = 'getPersoninfoRequest',
    'GET_PERSONINFO_SUCCESS' = 'getPersoninfoSuccess',
    'GET_PERSONINFO_FAILURE' = 'getPersoninfoFailure',
    'GET_SAKER_REQUEST' = 'getSakerRequest',
    'GET_SAKER_SUCCESS' = 'getSøkerInfoSuccess',
    'GET_SAKER_FAILURE' = 'getSøkerInfoFailure',
    'GET_STORAGE_KVITTERING_REQUEST' = 'ggetStorageKvitteringRequest',
    'GET_STORAGE_KVITTERING_SUCCESS' = 'getStorageKvitteringSuccess',
    'GET_STORAGE_KVITTERING_FAILURE' = 'getStorageKvitteringFailure'
}

export interface GetPersoninfoRequest {
    type: ApiActionTypes.GET_PERSONINFO_REQUEST;
}

export interface GetPersoninfoSuccess {
    type: ApiActionTypes.GET_PERSONINFO_SUCCESS;
    payload: {
        personinfo: Personinfo;
    };
}

export interface GetPersonfinoFailure {
    type: ApiActionTypes.GET_PERSONINFO_FAILURE;
    payload: {
        error: FetchError;
    };
}

export interface GetSakerRequest {
    type: ApiActionTypes.GET_SAKER_REQUEST
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
    type: ApiActionTypes.GET_STORAGE_KVITTERING_REQUEST
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


type ApiAction =
    | GetPersoninfoRequest
    | GetPersoninfoSuccess
    | GetPersonfinoFailure
    | GetSakerRequest
    | GetSakerSuccess
    | GetSakerFailure
    | GetStorageKvitteringRequest
    | GetStorageKvitteringSuccess 
    | GetStorageKvitteringFailure

export default ApiAction;
