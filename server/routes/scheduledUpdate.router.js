const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
// have to specify the port because it defaults to port: 80.
const PORT = process.env.PORT || 5000;
// have to specify url because it does not recognize where url is.
axios.defaults.baseURL = 'http://localhost:' + PORT;

const CronJob = require('cron').CronJob;
const job = new CronJob(
    // this is set to go off every Tuesday at 2:00 AM CDT
'0 0 2 * * 2',
function() {
    console.log('Update the games');
    deleteGames();
},
null,
true,
'America/Chicago'
);

function deleteGames() {
    console.log('cron task triggered!!!');
    console.log('in delete games')
    // clear out the games table
    axios.delete('/database/games')
    .then( result => {
      deleteWeek();
      // res.sendStatus(204)
    }).catch( err => {
      console.log(err);
      // res.sendStatus(500)
    })
}

function deleteWeek() {
  console.log('in delete week')
  // clear out the table of week
  axios.delete('/database/week')
  .then( result => {
    getWeek();
    // res.sendStatus(204)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function getWeek() {
  console.log('in get week')
  axios.get('/api/week')
  .then( result => {
    postWeek(result);
    // res.sendStatus(200)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function postWeek(week) {
  console.log('in post week')
  axios.post('/database/week', { week: week.data.currentWeek })
  .then( result => {
    getGames();
    // res.sendStatus(201)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function getGames() {
  console.log('in get games')
  axios.get('/api/games')
  .then( result => {
    postGames(result);
    // res.sendStatus(200)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function postGames(response) {
  console.log('in post games')
  axios.post('/database/games', { games: response.data })
  .then( result => {
    // res.sendStatus(201)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}


module.exports = router;