import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getGames() {
    try {
        const week = yield axios.get('/api/week');
        yield put({ type: 'SET_WEEK', payload: week.data.currentWeek})
        console.log('game saga triggered');
        const response = yield axios.get('/api/games');
        console.log('sent get games to server');
        yield put({ type: 'SET_GAMES', payload: response.data });
        yield axios.post('/api/games', { games: response.data });

      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* gamesSaga() {
    yield takeEvery('GET_GAMES', getGames)
}

export default gamesSaga;