import { all, put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api/api';
import {
    ApiActionTypes,
    GetPersoninfoRequest,
    GetSakerRequest,
    GetHistorikkRequest,
    GetMiniDialogRequest
} from '../types/ApiAction';
import Personinfo from 'app/types/Personinfo';
import Sak, { SakType } from 'app/types/sak/Sak';
import normalizeName from 'app/utils/normalizeName';
import { StorageKvittering } from 'app/types/StorageKvittering';
import { sakByDescendingOrder, erForeldrepengesak } from 'app/utils/sakerUtils';
import { HistorikkInnslag } from 'app/types/HistorikkInnslag';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';

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
        yield put({ type: ApiActionTypes.GET_PERSONINFO_FAILURE, payload: { error } });
    }
}

function* getSakerSaga(_: GetSakerRequest) {
    try {
        const response = yield call(Api.getSaker);
        let saker: Sak[] = response.data;
        if (saker) {
            saker.sort(sakByDescendingOrder);
            saker = yield all(saker.map(uttaksplanTilSakMapper));
        }
        yield put({ type: ApiActionTypes.GET_SAKER_SUCCESS, payload: { saker } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_SAKER_FAILURE, payload: { error } });
    }
}

function* uttaksplanTilSakMapper(sak: Sak): IterableIterator<any> {
    try {
        if (sak.saksnummer && sak.type === SakType.FPSAK && erForeldrepengesak(sak))     {
            const response = yield call(Api.getUttaksplan, sak.saksnummer);
            sak.saksgrunnlag = response.data;
        }
        return sak;
    } catch (error) {
        return sak;
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

function* getHistorikk(_: GetHistorikkRequest) {
    try {
        const response = yield call(Api.getHistorikk);
        const historikk: HistorikkInnslag[] = response.data;
        yield put({ type: ApiActionTypes.GET_HISTORIKK_SUCCESS, payload: { historikk } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_HISTORIKK_FAILURE, payload: { error } });
    }
}

function* getMiniDialog(_: GetMiniDialogRequest) {
    try {
        const response = yield call(Api.getMiniDialog);
        const miniDialog: MinidialogInnslag[] = response.data;
        yield put({ type: ApiActionTypes.GET_MINIDIALOG_SUCCESS, payload: { miniDialog } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_MINIDIALOG_FAILURE, payload: { error } });
    }
}

function* apiSaga() {
    yield all([takeLatest(ApiActionTypes.GET_PERSONINFO_REQUEST, getPersoninfoSaga)]);
    yield all([takeLatest(ApiActionTypes.GET_SAKER_REQUEST, getSakerSaga)]);
    yield all([takeLatest(ApiActionTypes.GET_STORAGE_KVITTERING_REQUEST, getStorageKvittering)]);
    yield all([takeLatest(ApiActionTypes.GET_HISTORIKK_REQUEST, getHistorikk)]);
    yield all([takeLatest(ApiActionTypes.GET_MINIDIALOG_REQUEST, getMiniDialog)]);
}

export default apiSaga;
