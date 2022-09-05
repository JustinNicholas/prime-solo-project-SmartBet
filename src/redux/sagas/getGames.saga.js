import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getGames() {

    try {
        const response = yield axios.get('/database/games');
        console.log('sent get games to server');
        console.log(response.data);
        yield put({ type: 'SET_GAMES', payload: response.data });

      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* getGamesSaga() {
    yield takeEvery('GET_GAMES', getGames)
}

export default getGamesSaga;