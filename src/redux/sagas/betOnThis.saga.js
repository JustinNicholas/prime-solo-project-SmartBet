import { put, take, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* betOnThis(action) {

    try {
        // GETS the info for this game from the DB and sets thisGame reducer. 
        let response = yield axios.get(`/database/thisGame/${action.payload.score_id}`);
        yield put({type: 'SET_THIS_GAME', payload: response.data});
      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* addBet(action) {
    console.log(action.payload);
    try {
      // sends the info for this game to the server to send to the table. 
      yield axios.post(`/database/thisGame`, action.payload);
      //may need to get the bet history in this spot.
    } catch (error) {
      console.log('User get request failed', error);
    }
}

function* betOnThisSaga() {
    yield takeEvery('BET_ON_THIS', betOnThis);
    yield takeEvery('ADD_BET', addBet);
}

export default betOnThisSaga;