import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateGames() {
  // const cron = require('node-cron');

  //   cron.schedule('* * * * * *', () => {
  //   console.log('running a task every minute');
  //   });
    try {
        yield axios.delete('/api/games');
        const week = yield axios.get('/api/week');
        yield put({ type: 'SET_WEEK', payload: week.data.currentWeek})
        console.log('game saga triggered');
        const response = yield axios.get('/api/games');
        console.log('sent get games to server');
        // yield put({ type: 'SET_GAMES', payload: response.data });
        yield axios.post('/api/games', { games: response.data });

      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* updateGamesSaga() {
    yield takeEvery('UPDATE_GAMES', updateGames)
}

export default updateGamesSaga;