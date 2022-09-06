import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* betOnThis(action) {

    try {
        // sends the info for this game to the server to send to the table. 
        let response = yield axios.get(`/database/thisGame/${action.payload.score_id}`);
        yield put({type: 'SET_THIS_GAME', payload: response.data});
      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* betOnThisSaga() {
    yield takeEvery('BET_ON_THIS', betOnThis)
}

export default betOnThisSaga;