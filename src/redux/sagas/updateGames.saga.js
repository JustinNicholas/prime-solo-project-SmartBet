import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateGames() {
  // const cron = require('node-cron');

  //   cron.schedule('* * * * * *', () => {
  //   console.log('running a task every minute');
  //   });
    try {
        //clear out the table of games
        yield axios.delete('/api/games');
        // clear out the table of week
        yield axios.delete('/api/week');
        // GET week info from the 3rd party api.
        const week = yield axios.get('/api/week');
        // POST the week info to the database with the response of week
        yield axios.post('/api/week', { week: week.data.currentWeek });
          console.log('game saga triggered');
        // GET games info from the 3rd party api
        const response = yield axios.get('/api/games');
          console.log('sent get games to server');
        // POST the games info to the database with the response of games response
        yield axios.post('/api/games', { games: response.data });

      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* updateGamesSaga() {
    yield takeEvery('UPDATE_GAMES', updateGames)
}

export default updateGamesSaga;
