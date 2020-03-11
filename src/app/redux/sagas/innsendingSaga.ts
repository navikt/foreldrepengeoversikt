import { all, call, takeLatest, put } from 'redux-saga/effects';
import Api from '../../api/api';
import { InnsendingActionTypes, SendEttersendelse } from '../types/InnsendingAction';
import { Routes } from 'app/utils/routes';
import { FetchStatus } from '../types/FetchState';

function* ettersend(action: SendEttersendelse) {
    try {
        const response = yield call(Api.sendEttersending, action.payload.ettersending);
        if (response) {
            const { ettersending, ettersendelseOrigin } = action.payload;

            action.payload.history.push(Routes.KVITTERING, {
                kvittering: response.data,
                attachments: ettersending.vedlegg,
                ettersendelseOrigin
            });

            yield put({
                type: InnsendingActionTypes.SEND_ETTERSENDELSE_SUCCESS,
                payload: {
                    ettersendelse: {
                        status: FetchStatus.SUCCESS
                    }
                }
            });
        }
    } catch (error) {
        yield put({
            type: InnsendingActionTypes.SEND_ETTERSENDELSE_FAILED,
            payload: { ettersendelse: { status: FetchStatus.FAILURE, error } }
        });
    }
}

function* innsendingSaga() {
    yield all([takeLatest(InnsendingActionTypes.SEND_ETTERSENDELSE, ettersend)]);
}

export default innsendingSaga;
