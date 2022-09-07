import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getTeams() {

    try {
        const response = yield axios.get('/database/teams');
        yield put({ type: 'SET_TEAMS', payload: response.data });

      } catch (error) {
        console.log(error);
      }
}

function* teamsSaga() {
    yield takeEvery('GET_TEAMS', getTeams)
}

export default teamsSaga;