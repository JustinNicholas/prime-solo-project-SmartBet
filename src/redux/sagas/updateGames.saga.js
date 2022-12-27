import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateGames() {

    try {
      yield axios.get('/database/updateData')
      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* updateGamesSaga() {
    yield takeEvery('UPDATE_GAMES', updateGames)
}

export default updateGamesSaga;
