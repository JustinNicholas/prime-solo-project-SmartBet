import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getGames() {
    try {
        console.log('game saga triggered');
        const response = yield axios.get('/api/games');
        console.log('sent get games to server');
        yield put({ type: 'SET_GAMES', payload: response.data });

      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* gamesSaga() {
    yield takeEvery('GET_GAMES', getGames)
}

export default gamesSaga;