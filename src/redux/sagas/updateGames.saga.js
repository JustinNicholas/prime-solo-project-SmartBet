import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateGames() {

    try {

    // Need to move this to the server side and use .then instead of yield
        //clear out the table of games
        yield axios.delete('/database/games');
        // clear out the table of week
        yield axios.delete('/database/week');
        // GET week info from the 3rd party api.
        const week = yield axios.get('/api/week');
        // POST the week info to the database with the response of week
        yield axios.post('/database/week', { week: week.data.currentWeek });
          console.log('game saga triggered');
        // GET games info from the 3rd party api
        const response = yield axios.get('/api/games');
          console.log('sent get games to server');
        // POST the games info to the database with the response of games response
        yield axios.post('/database/games', { games: response.data });
      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* updateGamesSaga() {
    yield takeEvery('UPDATE_GAMES', updateGames)
}

export default updateGamesSaga;
