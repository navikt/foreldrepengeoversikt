import { all, put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionTypes, GetPersoninfoRequest, GetSakerRequest } from '../types/ApiAction';
import Personinfo from 'app/types/Personinfo';
import Sak from 'app/types/Sak';
import normalizeName from 'app/utils/normalizeName';
import { StorageKvittering } from 'app/types/StorageKvittering';
import { redirectToLogin } from 'app/utils/login';
import { sakByDescendingOrder } from 'app/utils/sakerUtils';

function* getPersoninfoSaga(_: GetPersoninfoRequest) {
    try {
        const response = yield call(Api.getPersoninfo);
        const responseData = response.data;
        const personinfo: Personinfo = {
            ...responseData,
            fornavn: normalizeName(responseData.fornavn),
            mellomnavn: responseData.mellomnavn ? normalizeName(responseData.mellomnavn) : undefined,
            etternavn: normalizeName(responseData.etternavn)
        };

        yield put({ type: ApiActionTypes.GET_PERSONINFO_SUCCESS, payload: { personinfo } });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            redirectToLogin(); 
        }
        yield put({ type: ApiActionTypes.GET_PERSONINFO_FAILURE, payload: { error } });
    }
}

function* getSakerSaga(_: GetSakerRequest) {
    try {
        const response = yield call(Api.getSaker);
        const saker: Sak[] = response.data;
        if(saker){
            saker.sort(sakByDescendingOrder)
        }
        yield put({ type: ApiActionTypes.GET_SAKER_SUCCESS, payload: { saker } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_SAKER_FAILURE, payload: { error } });
    }
}

function* getStorageKvittering(_: GetSakerRequest) {
    try {
        const response = yield call(Api.getStorageKvittering);
        const storageKvittering: StorageKvittering = response.data;
        yield put({ type: ApiActionTypes.GET_STORAGE_KVITTERING_SUCCESS, payload: { storageKvittering } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_STORAGE_KVITTERING_FAILURE, payload: { error } });
    }
}

function* apiSaga() {
    yield all([takeLatest(ApiActionTypes.GET_PERSONINFO_REQUEST, getPersoninfoSaga)]);
    yield all([takeLatest(ApiActionTypes.GET_SAKER_REQUEST, getSakerSaga)]);
    yield all([takeLatest(ApiActionTypes.GET_STORAGE_KVITTERING_REQUEST, getStorageKvittering)]);
}

export default apiSaga;
