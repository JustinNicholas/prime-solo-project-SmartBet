import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getWeek() {
console.log('in get week');
    try {
        const response = yield axios.get('/database/week');
        console.log('sent get week to server');
        console.log('This is the week!!!', response.data);
        yield put({ type: 'SET_WEEK', payload: response.data[0].week });
        console.log('just set the week...');
      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* getWeekSaga() {
    yield takeEvery('GET_WEEK', getWeek)
}

export default getWeekSaga;

  // will need this in the update week router
  // yield put({ type: 'SET_WEEK', payload: week.data.currentWeek})