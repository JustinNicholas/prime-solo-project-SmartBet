import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getBets(action) {

    try {
        const response = yield axios.get('/database/bets');
        console.log(response.data);
        yield put({ type: 'SET_BET_HISTORY', payload: response.data });

      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* getBetsSaga() {
    yield takeEvery('GET_BET_HISTORY', getBets)
}

export default getBetsSaga;