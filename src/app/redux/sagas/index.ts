import { all } from 'redux-saga/effects';
import apiSaga from './apiSaga';
import innsendingSaga from './innsendingSaga';

function* rootSaga() {
    yield all([apiSaga(), innsendingSaga()]);
}

export default rootSaga;
