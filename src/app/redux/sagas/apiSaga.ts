import { all, put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api/api';
import {
    ApiActionTypes,
    GetSøkerinfoRequest,
    GetSakerRequest,
    GetHistorikkRequest,
    GetMiniDialogRequest,
    GetSakerSuccess
} from '../types/ApiAction';
import SakBase, { SakType } from 'app/api/types/sak/Sak';
import { StorageKvittering } from 'app/api/types/StorageKvittering';
import { sakByDescendingOrder, erForeldrepengesak } from 'app/utils/sakerUtils';
import { Innsendingsinnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { uttaksperiodeDtoToPeriode } from 'app/utils/uttaksplanDtoToPeriodeMapper';
import { fyllInnHull } from 'app/utils/periodeUtils';
import { isFeatureEnabled, Feature } from 'app/Feature';
import { SøkerinfoDTO } from 'app/api/types/personinfo/SøkerinfoDto';
import { getSøkerinfoFromDTO } from 'app/utils/søkerinfoDtoMapper';
import { getTilgjengeligeStønadskontoer } from './stønadskontoSaga';
import { cleanupUttaksplanDto } from 'app/utils/uttaksplanDtoUtils';

function* getPersoninfoSaga(_: GetSøkerinfoRequest) {
    try {
        const response = yield call(Api.getPersoninfo);
        const responseData: SøkerinfoDTO = response.data;
        const søkerinfo = getSøkerinfoFromDTO(responseData);
        yield put({ type: ApiActionTypes.GET_SØKERINFO_SUCCESS, payload: { søkerinfo } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_SØKERINFO_FAILURE, payload: { error } });
    }
}

function* getSakerSaga(_: GetSakerRequest) {
    try {
        const response = yield call(Api.getSaker);
        let saker: SakBase[] = response.data;
        if (saker) {
            saker.sort(sakByDescendingOrder);
            if (isFeatureEnabled(Feature.dinPlan)) {
                saker = yield all(saker.map(uttaksplanTilSakMapper));
                if (isFeatureEnabled(Feature.kontooversikt)) {
                    const foreldrepengesaker = saker.filter(erForeldrepengesak);

                    for (const foreldrepengesak of foreldrepengesaker) {
                        foreldrepengesak.tilgjengeligeKontoer = yield call(
                            getTilgjengeligeStønadskontoer,
                            foreldrepengesak
                        );
                    }
                }
            }
        }
        yield put({ type: ApiActionTypes.GET_SAKER_SUCCESS, payload: { saker } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_SAKER_FAILURE, payload: { error } });
    }
}

function* uttaksplanTilSakMapper(sak: SakBase) {
    try {
        if (sak.saksnummer && sak.type === SakType.FPSAK && erForeldrepengesak(sak)) {
            const response = yield call(Api.getUttaksplan, sak.saksnummer);
            sak.saksgrunnlag = response.data;

            sak.perioder = cleanupUttaksplanDto(sak.saksgrunnlag!.perioder)
                .map((p) => uttaksperiodeDtoToPeriode(p, sak.saksgrunnlag!.grunnlag.søkerErFarEllerMedmor))
                .reduce(fyllInnHull, []);
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
        const historikk: Innsendingsinnslag[] = response.data;
        yield put({ type: ApiActionTypes.GET_HISTORIKK_SUCCESS, payload: { historikk } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_HISTORIKK_FAILURE, payload: { error } });
    }
}

function* getMiniDialog(_: GetMiniDialogRequest) {
    try {
        const response = yield call(Api.getMiniDialog);
        const minidialogInnslagListe = response.data;
        yield put({
            type: ApiActionTypes.GET_MINIDIALOG_SUCCESS,
            payload: {
                minidialogInnslagListe
            }
        });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_MINIDIALOG_FAILURE, payload: { error } });
    }
}

function* getManglendeVedlegg(sakerSuccess: GetSakerSuccess) {
    try {
        const saker = sakerSuccess.payload.saker;

        if (saker) {
            saker.sort(sakByDescendingOrder);
            const foreldrepengesaker = saker.filter(erForeldrepengesak);

            if (foreldrepengesaker.length > 0 && foreldrepengesaker[0].saksnummer) {
                const response = yield call(Api.getManglendeVedlegg, foreldrepengesaker[0].saksnummer);
                const manglendeVedlegg = response.data;
                yield put({
                    type: ApiActionTypes.GET_MANGLENDE_VEDLEGG_SUCCESS,
                    payload: {
                        manglendeVedlegg
                    }
                });
            }
        }
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_MANGLENDE_VEDLEGG_FAILURE, payload: { error } });
    }
}

function* apiSaga() {
    yield all([takeLatest(ApiActionTypes.GET_SØKERINFO_REQUEST, getPersoninfoSaga)]);
    yield all([takeLatest(ApiActionTypes.GET_SAKER_REQUEST, getSakerSaga)]);
    yield all([takeLatest(ApiActionTypes.GET_STORAGE_KVITTERING_REQUEST, getStorageKvittering)]);
    yield all([takeLatest(ApiActionTypes.GET_HISTORIKK_REQUEST, getHistorikk)]);
    yield all([takeLatest(ApiActionTypes.GET_MINIDIALOG_REQUEST, getMiniDialog)]);
    yield all([takeLatest(ApiActionTypes.GET_SAKER_SUCCESS, getManglendeVedlegg)]);
}

export default apiSaga;
