import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getBets() {

    try {
        const response = yield axios.get('/database/bets');
        yield put({ type: 'SET_BET_HISTORY', payload: response.data });
      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* getWinningestTeam() {
  try{
    const response = yield axios.get('/database/bets/winningest');
    yield put({ type: 'SET_WINNINGEST_TEAM', payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* getLosingestTeam() {
  try{
    const response = yield axios.get('/database/bets/losingest');
    yield put({ type: 'SET_LOSINGEST_TEAM', payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* deleteBet(action) {
    try {
        yield axios.delete(`/database/bets/${action.payload}`)
        yield put({ type: 'GET_BET_HISTORY' });
    } catch (error) {
        console.log(error);
    }
}

function* editBet(action) {
    try {
      let response = yield axios.get(`/database/bets/${action.payload.id}`)
      yield put({type: 'SET_THIS_GAME', payload: response.data})
    } catch (error) {
      console.log(error);
    }
  }

  function* submitEditBet(action) {
    try {
      yield axios.put(`/database/bets/${action.payload.id}`, action.payload)
      yield put({type: 'GET_BET_HISTORY'})
    } catch (error) {
      console.log(error);
    }
  }

function* getBetsSaga() {
    yield takeEvery('GET_BET_HISTORY', getBets);
    yield takeEvery('DELETE_BET', deleteBet);
    yield takeEvery('EDIT_THIS_BET', editBet);
    yield takeEvery('SUBMIT_EDIT_BET', submitEditBet);
    yield takeEvery('GET_WINNINGEST_TEAM', getWinningestTeam);
    yield takeEvery('GET_LOSINGEST_TEAM', getLosingestTeam);
}

export default getBetsSaga;