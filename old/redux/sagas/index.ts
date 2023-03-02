import { all } from 'redux-saga/effects';
import apiSaga from './apiSaga';
import innsendingSaga from './innsendingSaga';
import søknadskontoerSaga from './stønadskontoSaga';

function* rootSaga() {
    yield all([apiSaga(), innsendingSaga(), søknadskontoerSaga()]);
}

export default rootSaga;
